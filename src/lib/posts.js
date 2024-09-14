import { getPosts } from './reddit-api';
import { writable, derived } from "svelte/store";

const PREFETCH_OFFSET = 5;
const THUMBNAILS_OFFSET = 5;

export const posts = createPostsStore();

export const current = derived(
  posts,
  ($p, set) => {
    set($p.queue[$p.current])
  }
);

export const prefetch = derived(
  posts,
  ($p, set) => {
    set($p.queue.slice(
      $p.current,
      $p.current + PREFETCH_OFFSET
    ));
  }
);

export const runningLow = derived(
  prefetch,
  ($p, set) => {
    set(
      $p.length === 0
        ? false
        : $p.length < PREFETCH_OFFSET
    );
  }
);

export const thumbnails = derived(
  posts,
  ($p, set) => {
    const min = Math.max($p.current - THUMBNAILS_OFFSET, 0);
    const max = min === 0 ? THUMBNAILS_OFFSET * 2 : $p.current + THUMBNAILS_OFFSET;
    set($p.queue.slice(min, max));
  }
);

function createPostsStore() {
  const store = writable({
    current: 0,
    queue: [],
  });

  let _path;
  let _params;
  let _after;
  async function load(path, params) {
    _path = path;
    _params = params;
    const data = await getPosts(path, params);
    _after = data.after;
    add(data.posts);
  }
  async function loadMore() {
    if (!_after) return;
    _params.set('after', _after);
    const data = await getPosts(_path, _params);
    _after = data.after;
    add(data.posts);
  }
  function add(posts) {
    const formatted = posts.reduce((list, cur) => {
      if (cur.album.length) {
        list.push(...cur.album);
      } else {
        list.push(cur);
      }
      return list;
    }, []);
    store.update(s => {
      return {
        ...s,
        queue: [...s.queue, ...formatted].map((q, idx) => ({ ...q, idx }))
      }
    });
  }

  function next() {
    store.update(s => {
      if (s.current + 1 === s.queue.length) return s;
      s.current++;
      return s;
    });
  }
  function prev() {
    store.update(s => {
      if (s.current === 0) return s;
      s.current--;
      return s;
    });
  }
  function first() {
    store.update(s => {
      s.current = 0;
      return s;
    });
  }
  function last() {
    store.update(s => {
      s.current = s.queue.length;
      return s;
    });
  }
  function goto(idx) {
    store.update(s => {
      if (!s.queue.at(idx)) return s;
      s.current = idx;
      return s;
    });
  }

  return {
    subscribe: store.subscribe,
    load,
    loadMore,
    next,
    prev,
    first,
    last,
    goto,
  }
}
