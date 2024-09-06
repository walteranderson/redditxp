import { writable, derived } from "svelte/store";

export const currentIdx = writable(0);

export const queue = writable([]);

export const prefetch = derived(
  [queue, currentIdx],
  ([$queue, $currentIdx], set) => {
    set($queue.slice(
      $currentIdx,
      $currentIdx + 5
    ));
  }
)
