import { posts } from '$lib/posts';

export async function load({ params, url }) {
  posts.load(params.path, url.searchParams);
}
