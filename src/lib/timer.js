import { derived, writable } from "svelte/store";

export const autoplay = writable(false);
export const interval = writable(1_000);
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
