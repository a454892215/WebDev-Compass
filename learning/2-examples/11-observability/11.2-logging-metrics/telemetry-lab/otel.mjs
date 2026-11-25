import {
  context,
  propagation,
  trace,
  ROOT_CONTEXT,
  SpanKind,
} from "@opentelemetry/api";
import { AsyncLocalStorageContextManager } from "@opentelemetry/context-async-hooks";
import { W3CTraceContextPropagator } from "@opentelemetry/core";
import {
  TracerProvider,
  InMemorySpanExporter,
  SimpleSpanProcessor,
  AlwaysOnSampler,
} from "@opentelemetry/sdk-trace";
import {
  MeterProvider,
  PeriodicExportingMetricReader,
  InMemoryMetricExporter,
  AggregationTemporality,
  AggregationType,
} from "@opentelemetry/sdk-metrics";

export function createTelemetry() {
  const manager = new AsyncLocalStorageContextManager().enable();
  context.setGlobalContextManager(manager);
  const propagator = new W3CTraceContextPropagator();
  propagation.setGlobalPropagator(propagator);
  const exporter = new InMemorySpanExporter();
  const provider = new TracerProvider({
    sampler: new AlwaysOnSampler(),
    spanProcessors: [new SimpleSpanProcessor({ exporter })],
  });
  trace.setGlobalTracerProvider(provider);
  const tracer = provider.getTracer("stage11-lab");
  const metricExporter = new InMemoryMetricExporter(
    AggregationTemporality.CUMULATIVE,
  );
  const reader = new PeriodicExportingMetricReader({
    exporter: metricExporter,
    exportIntervalMillis: 3600000,
  });
  const meterProvider = new MeterProvider({
    readers: [reader],
    views: [
      {
        instrumentName: "lab.request.duration",
        aggregation: {
          type: AggregationType.EXPLICIT_BUCKET_HISTOGRAM,
          options: { boundaries: [100, 300, 1000] },
        },
      },
    ],
  });
  const meter = meterProvider.getMeter("stage11-lab");
  const counter = meter.createCounter("lab.requests", { unit: "{request}" });
  const duration = meter.createHistogram("lab.request.duration", {
    unit: "ms",
  });
  return {
    async work(carrier = {}, delay = 0) {
      const parent = propagator.extract(ROOT_CONTEXT, carrier, {
        keys: (value) => Object.keys(value),
        get: (value, key) => value[key],
      });
      return context.with(parent, () =>
        tracer.startActiveSpan(
          "GET /work",
          { kind: SpanKind.SERVER },
          async (span) => {
            try {
              if (delay)
                await new Promise((resolve) => setTimeout(resolve, delay));
              const child = tracer.startSpan("catalog.read");
              const result = {
                traceId: span.spanContext().traceId,
                spanId: span.spanContext().spanId,
                childSpanId: child.spanContext().spanId,
              };
              child.end();
              counter.add(1, { route: "catalog", outcome: "ok" });
              return result;
            } finally {
              span.end();
            }
          },
        ),
      );
    },
    recordDuration(ms) {
      if (!Number.isFinite(ms) || ms < 0 || ms > 60000)
        throw new TypeError("milliseconds");
      duration.record(ms, { route: "catalog" });
    },
    async snapshot() {
      await provider.forceFlush();
      metricExporter.reset();
      await meterProvider.forceFlush();
      return {
        spans: exporter
          .getFinishedSpans()
          .map((s) => ({
            name: s.name,
            traceId: s.spanContext().traceId,
            spanId: s.spanContext().spanId,
            parentSpanId: s.parentSpanContext?.spanId ?? null,
          })),
        metrics: metricExporter
          .getMetrics()
          .flatMap((r) =>
            r.scopeMetrics.flatMap((s) =>
              s.metrics.map((m) => ({
                name: m.descriptor.name,
                unit: m.descriptor.unit,
                dataPoints: m.dataPoints,
              })),
            ),
          ),
      };
    },
    async close() {
      await provider.shutdown();
      await meterProvider.shutdown();
      context.disable();
      propagation.disable();
      trace.disable();
      manager.disable();
    },
  };
}
