<script>
  import Controls from "$lib/components/controls/controls.svelte";
  import Post from "$lib/components/post.svelte";
  import { tick } from "$lib/timer";
  import { posts, current, runningLow, prefetch } from "$lib/posts";

  $: if ($tick) posts.next();
  $: if ($runningLow) posts.loadMore();

  $: console.log({
    queue: $posts.queue.length,
    $current,
    $prefetch,
    $runningLow,
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
