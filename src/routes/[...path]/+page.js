import { getPosts } from "$lib/reddit-api";
import { queue } from '$lib/posts';

export async function load({ params, url }) {
  const data = await getPosts(params.path, url.searchParams);

  addToQueue(data.posts);

  let after = data.after;
  async function loadMore() {
    const query = url.searchParams;
    query.set('after', after);
    const res = await getPosts(params.path, query);
    after = res.after;
    addToQueue(res.posts);
  }

  function addToQueue(posts) {
    const formatted = posts.reduce((list, cur) => {
      if (cur.album.length) {
        list.push(...cur.album);
      } else {
        list.push(cur);
      }
      return list;
    }, []);

    queue.update(queue => {
      const newQueue = [...queue, ...formatted];
      return newQueue.map((q, idx) => ({ ...q, idx }))
    });
  }

  return {
    loadMore,
  }
}
