<script>
  import Controls from "$lib/components/controls.svelte";
  import Video from "$lib/components/video.svelte";
  import Image from "$lib/components/image.svelte";
  import { tick } from "$lib/timer";
  import { currentIdx, queue } from "$lib/posts";

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
  <div>
    {#if current.video}
      <Video src={current.video.src} />
    {:else}
      <Image url={current.url} />
    {/if}
  </div>
{/if}

<style>
  :global(html, body) {
    background-color: black;
    height: 100%;
    margin: 0;
    font-family: Helvetica, Arial, sans-serif;
  }

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }
</style>
