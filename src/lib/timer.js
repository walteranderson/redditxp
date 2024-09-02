import { get, writable } from "svelte/store";

export const timer = createTimer({ autoplay: false, interval: 5_000 });

export function createTimer({ autoplay, interval }) {
  const store = writable({
    autoplay,
    interval,
    tick: null,
  });

  let ref;
  function start() {
    if (ref) stop();
    console.log('timer:start', { interval: get(store).interval });
    ref = setInterval(tick, get(store).interval);
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

  return {
    subscribe: store.subscribe,
    start,
    stop,
    setInterval: (interval) => {
      store.update(s => ({ ...s, interval }))
      start();
    },
    toggleAutoplay: () => store.update(s => {
      const autoplay = !s.autoplay;
      autoplay ? start() : stop();
      return { ...s, autoplay }
    }),
  }
}
