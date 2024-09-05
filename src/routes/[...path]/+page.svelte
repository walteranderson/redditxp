<script>
  import Controls from "$lib/components/controls.svelte";
  import Video from "$lib/components/video.svelte";
  import Image from "$lib/components/image.svelte";
  import { tick, autoplay } from "$lib/timer";
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
      <Image url={current.url} title={current.title} />
    {/if}
  </div>
{/if}

{#if $autoplay}
  <div class="prefetch">
    {#each $prefetch as post}
      {#if !post.video}
        <link rel="prefetch" fetchpriority="low" href={post.url} as="image" />
      {/if}
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
