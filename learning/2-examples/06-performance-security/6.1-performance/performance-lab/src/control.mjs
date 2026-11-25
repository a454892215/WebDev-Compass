export function debounce(
  fn,
  delay,
  clock = {
    set: (fn, ms) => setTimeout(fn, ms),
    clear: (id) => clearTimeout(id),
  },
) {
  let timer;
  const wrapped = (...args) => {
    if (timer !== undefined) clock.clear(timer);
    timer = clock.set(() => {
      timer = undefined;
      fn(...args);
    }, delay);
  };
  wrapped.cancel = () => {
    if (timer !== undefined) clock.clear(timer);
    timer = undefined;
  };
  return wrapped;
}
export function throttle(
  fn,
  delay,
  clock = {
    now: () => Date.now(),
    set: (fn, ms) => setTimeout(fn, ms),
    clear: (id) => clearTimeout(id),
  },
) {
  let last = -Infinity,
    timer,
    args;
  const run = () => {
    timer = undefined;
    last = clock.now();
    fn(...args);
  };
  const wrapped = (...next) => {
    args = next;
    const remaining = delay - (clock.now() - last);
    if (remaining <= 0) {
      if (timer !== undefined) clock.clear(timer);
      run();
    } else if (timer === undefined) timer = clock.set(run, remaining);
  };
  wrapped.cancel = () => {
    if (timer !== undefined) clock.clear(timer);
    timer = undefined;
    args = undefined;
    last = -Infinity;
  };
  return wrapped;
}
