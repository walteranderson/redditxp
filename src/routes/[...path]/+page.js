import { getPosts } from "$lib/reddit-api";

export async function load({ params, url }) {
  const { posts, after } = await getPosts(params.path, url.searchParams);
  return {
    posts,
    after
  }
}
