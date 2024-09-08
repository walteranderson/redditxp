import { writable, derived } from "svelte/store";

export const currentIdx = writable(0);

export const queue = writable([]);

export const current = derived(
  [queue, currentIdx],
  ([$queue, $idx], set) => {
    set($queue[$idx]);
  }
);

export const prefetch = derived(
  [queue, currentIdx],
  ([$queue, $currentIdx], set) => {
    set($queue.slice(
      $currentIdx,
      $currentIdx + 5
    ));
  }
)

export const thumbnails = derived(
  [queue, currentIdx],
  ([$queue, $currentIdx], set) => {
    const min = Math.max($currentIdx - 5, 0);
    const max = min === 0 ? 10 : $currentIdx + 5;
    set($queue.slice(min, max));
  }
);
