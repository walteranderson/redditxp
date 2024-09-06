import { derived, writable } from "svelte/store";
import * as storage from './storage';

export const autoplay = writable(storage.get('autoplay'));
export const interval = writable(storage.get('interval'));
export const tick = derived([autoplay, interval], ([$autoplay, $interval], set) => {
  storage.set({
    autoplay: $autoplay,
    interval: $interval,
  });

  let ref;
  const start = (i) => {
    ref = setInterval(() => set(Date.now()), i);
  };
  const clear = () => {
    if (!ref) return;
    clearInterval(ref);
  };

  if ($autoplay) {
    if (ref) clear();
    start($interval)
  } else {
    clear();
  }

  return () => {
    clear();
  }
});
