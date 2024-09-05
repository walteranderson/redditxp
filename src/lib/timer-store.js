import { get, writable } from "svelte/store";

export const timer = createTimer({ autoplay: false, interval: 5_000 });

export function createTimer({ autoplay, interval }) {
  const store = writable({
    autoplay,
    interval,
    tick: null
  });

  let ref;
  if (autoplay) {
    console.log('here');
  }

  function start(i) {
    if (ref) stop();
    const interval = i || get(store).interval;
    if (interval === 0) {
      stop();
      return;
    }
    console.log('timer:start', { interval });
    ref = setInterval(tick, interval);
  }

  function stop() {
    console.log('timer:stop');
    clearInterval(ref);
  }

  function tick() {
    console.log('timer:tick', new Date());
    store.update((s) => ({
      ...s,
      tick: new Date()
    }));
  }

  function restart() {
    if (!get(store).autoplay) return;
    console.log('timer:restart');
    stop();
  }

  function setInterval(newInterval) {
    store.update(s => {
      let interval = newInterval >= 0 ? newInterval : 0;
      if (s.autoplay) {
        start(interval);
      }
      return {
        ...s,
        interval,
      }
    })
  }

  function toggleAutoplay() {
    store.update(s => {
      const autoplay = !s.autoplay;
      autoplay ? start() : stop();
      return { ...s, autoplay }
    })
  }

  return {
    subscribe: store.subscribe,
    start,
    stop,
    restart,
    setInterval,
    toggleAutoplay,
  }
}
