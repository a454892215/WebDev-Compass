import { defineComponent, h, ref } from 'vue';
import type { Task } from './contracts.js';
import { titleOf } from './contracts.js';
function assert(condition: unknown, message: string): asserts condition { if (!condition) throw new Error(message); }
export function purpose() {
  const length = (value: string): number => value.length;
  const unsafe = JSON.parse('{"title":42}') as { title: string };
  assert(typeof unsafe.title === 'number', 'as does not convert values');
  return { titleLength: length('阅读'), assertedTitleRuntimeType: typeof unsafe.title };
}
enum State { Pending, Done }
export function basics() {
  const title: string = 'Vue', count: number = 2, done: boolean = false;
  const ids: string[] = ['a', 'b']; const pair: readonly [string, number] = ['a', 1];
  const payload: unknown = { title };
  const narrow = typeof payload === 'object' && payload !== null && 'title' in payload;
  let observed: string | undefined;
  function log(value: string): void { observed = value; }
  function fail(message: string): never { throw new Error(message); }
  log(pair[0]); try { fail('controlled'); } catch { /* expected */ }
  const unchecked: any = { n: 'not a number' }; // deliberately unsafe escape hatch
  assert(State.Done === 1 && narrow && observed === 'a', 'basic types');
  return { title, count, done, firstId: ids[0], enumObjectExists: typeof State === 'object', anyProducesNaN: Number.isNaN(unchecked.n * 2) };
}
interface Book { id: string }
interface Book { title: string }
type Identifier = string | number;
export function aliases() {
  const value = { id: 'a', title: '类型', extra: true };
  const structural: Book = value; const id: Identifier = 1;
  assert(structural.title === '类型', 'declaration merging');
  return { id, title: structural.title, extraRuntimeProperty: 'extra' in structural };
}
type Load = { kind: 'ok'; value: string } | { kind: 'error'; reason: string };
function display(result: Load): string {
  switch (result.kind) {
    case 'ok': return result.value;
    case 'error': return result.reason;
    default: { const unreachable: never = result; return unreachable; }
  }
}
export function unions() {
  const record: { id: string } & { updatedAt: number } = { id: 'a', updatedAt: 1 };
  const success = display({ kind: 'ok', value: '已加载' }), failure = display({ kind: 'error', reason: '重试' });
  assert(success === '已加载' && failure === '重试', 'union narrowing'); return { success, failure, record };
}
function findById<T extends { id: string }>(items: readonly T[], id: string): T | undefined { return items.find(item => item.id === id); }
export function generics() {
  const source: Task[] = [{ id: 'a', title: '约束', done: false }];
  const found = findById(source, 'a'); const patch: Partial<Task> = { done: true };
  const preview: Pick<Task, 'id' | 'title'> = { id: 'a', title: '约束' };
  const creation: Omit<Task, 'id'> = { title: '新项', done: false };
  const names: Record<'pending' | 'done', string> = { pending: '待办', done: '完成' };
  assert(found?.title === '约束' && findById(source, 'missing') === undefined, 'generic constraints');
  return { title: found.title, patch, preview, creation, names };
}
function isTask(value: unknown): value is Pick<Task, 'id' | 'title'> {
  return typeof value === 'object' && value !== null && 'id' in value && typeof value.id === 'string' && 'title' in value && typeof value.title === 'string';
}
export function narrowing() {
  const values: unknown[] = [null, { id: 3, title: '坏字段' }, { id: 'a', title: '有效' }];
  const good = values.filter(isTask).map(task => task.title); const unsafe = values[1] as Task;
  assert(good.length === 1 && typeof unsafe.id === 'number', 'guard versus assertion');
  return { acceptedTitles: good, assertedIdRuntimeType: typeof unsafe.id, dateGuard: new Date() instanceof Date };
}
type Formatter = (title: string, prefix?: string) => string;
function shorten(title: string, limit = 4, suffix?: string): string { return title.length > limit ? title.slice(0, limit) + (suffix ?? '…') : title; }
export function functions() {
  const format: Formatter = (title, prefix = '') => prefix + title;
  const outputs = [format('阅读'), format('阅读', '#'), shorten('TypeScript', undefined, '!')];
  assert(outputs.join('|') === '阅读|#阅读|Type!', 'optional/default params'); return { outputs };
}
class Counter {
  readonly id: string; private cache = 2; protected increment = 1; #secret = 7;
  constructor(id: string) { this.id = id; }
  read(): number { return this.cache + this.#secret; }
  static readSecret(value: Counter): number { return value.#secret; }
}
class ChildCounter extends Counter { step(): number { return this.increment; } }
export function classes() {
  const counter = new ChildCounter('a'), privateVisible = Reflect.get(counter, 'cache');
  Reflect.set(counter, 'id', 'changed'); // readonly is not Object.freeze
  let brandRejected = false; try { Counter.readSecret({} as Counter); } catch (error) { brandRejected = error instanceof TypeError; }
  assert(privateVisible === 2 && counter.id === 'changed' && brandRejected && counter.read() === 9, 'class boundaries');
  return { privateVisible, readonlyRuntimeId: counter.id, protectedViaSubclass: counter.step(), hashPrivateBrandRejected: brandRejected };
}
export function modules() {
  const task: Task = { id: 'a', title: '模块', done: false }; const declarationOnlyRuntime = typeof BUILD_META;
  assert(declarationOnlyRuntime === 'undefined' && titleOf(task) === '模块', '.d.ts does not implement values');
  return { title: titleOf(task), declarationOnlyRuntime };
}
export function config() {
  const values: readonly string[] = []; const first: string | undefined = values[0]; const label = first ?? '空列表';
  assert(label === '空列表', 'noUncheckedIndexedAccess'); return { label, target: 'ES2022', note: 'alias/no-polyfill boundaries are verified separately' };
}
export const ReadingCard = defineComponent({
  name: 'ReadingCard',
  props: { title: { type: String, required: true }, done: { type: Boolean, default: false } },
  emits: { select: (id: string) => typeof id === 'string' },
  setup(props, { emit }) { return () => h('button', { type: 'button', onClick: () => emit('select', props.title) }, props.title); },
});
export type CardProps = InstanceType<typeof ReadingCard>['$props'];
function useSelection() { const selected = ref<string | null>(null); return { selected, select: (id: string) => { selected.value = id; } }; }
export function vue() {
  const props: CardProps = { title: '类型预告', onSelect: (id: string) => id.toUpperCase() };
  const state = useSelection(); state.select('a'); const vnode = h(ReadingCard, props);
  assert(state.selected.value === 'a' && vnode.props?.title === '类型预告', 'Vue types');
  return { selected: state.selected.value, vnodeTitle: vnode.props?.title, scope: 'types/VNode/composable, not DOM mount' };
}
interface TitleOnly { title: string }
function readTitle(value: TitleOnly): string { return value.title; }
export function mobileBoundary() {
  const extra = { title: '结构兼容', id: 'extra' }; const source: unknown = null;
  const checked = typeof source === 'object' && source !== null && 'title' in source; const values: string[] = [];
  assert(readTitle(extra) === '结构兼容' && !checked && values[0] === undefined, 'structural/nullable boundary');
  return { structuralTitle: readTitle(extra), nullRejected: !checked, missingElement: values[0] ?? 'undefined handled', scope: 'TypeScript runtime only, not Dart/Kotlin execution' };
}
