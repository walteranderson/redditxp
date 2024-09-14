<script>
  import Controls from "$lib/components/controls/controls.svelte";
  import Post from "$lib/components/post.svelte";
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { tick } from "$lib/timer";
  import { posts, current, runningLow, prefetch } from "$lib/posts";

  onMount(() => {
    if ($posts.queue.length === 0) {
      posts.load(
        $page.url.hash ? $page.url.hash.slice(1) : $page.params.path,
        // TODO: pull out search params from hash if present
        $page.url.searchParams
      );
    }
  });

  $: if ($tick) posts.next();
  $: if ($runningLow) posts.loadMore();

  $: console.log({
    queue: $posts.queue.length,
    $current,
  });
</script>

{#if $current}
  <Controls />

  <div class="current">
    <Post post={$current} />
  </div>
{/if}

{#if $prefetch.length}
  <div class="prefetch">
    {#each $prefetch as post}
      <Post {post} />
    {/each}
  </div>
{/if}

<style>
  :global(html, body) {
    background-color: black;
    height: 100%;
    margin: 0;
    font-family: Helvetica, Arial, sans-serif;
  }

  .current {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }
  .prefetch {
    display: none;
  }
</style>
