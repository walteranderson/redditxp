import { derived, writable } from "svelte/store";
import { get } from './storage';

export const autoplay = writable(get('autoplay'));
export const interval = writable(get('interval'));
export const tick = derived([autoplay, interval], ([$autoplay, $interval], set) => {
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
