import { writable } from "svelte/store";

export const currentIdx = writable(0);

export const queue = writable([]);
