<script>
  import Controls from "$lib/components/controls.svelte";
  import Video from "$lib/components/video.svelte";
  import Image from "$lib/components/image.svelte";
  import { tick } from "$lib/timer";
  import { currentIdx, queue, prefetch } from "$lib/posts";

  export let data;

  $: if ($currentIdx + 2 === $queue.length) data.loadMore();

  $: if ($tick) next();
  function next() {
    $currentIdx++;
  }

  $: current = $queue[$currentIdx];
</script>

<Controls />

{#if current}
  <div class="current">
    {#if current.video}
      <Video src={current.video.src} />
    {:else}
      <Image url={current.url} />
    {/if}
  </div>
{/if}

<div class="prefetch">
  {#each $prefetch as post}
    {#if !post.video}
      <link rel="preload" href={post.url} as="image" />
    {/if}
  {/each}
</div>

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
</style>
