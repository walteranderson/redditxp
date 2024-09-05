<script>
  import { getPosts } from "$lib/reddit-api";
  import { page } from "$app/stores";
  import Controls from "$lib/components/controls.svelte";
  import Video from "$lib/components/video.svelte";
  import Image from "$lib/components/image.svelte";
  import { tick } from "$lib/timer-store";
  import { currentIdx, queue } from "$lib/posts-store";

  export let data;

  let after = data.after;

  data.posts.forEach(addToQueue);
  function addToQueue(post) {
    if (post.album.length) {
      $queue = [...$queue, ...post.album];
    } else {
      $queue = [...$queue, post];
    }
  }

  $: if ($currentIdx + 2 === $queue.length) loadMore();
  async function loadMore() {
    const searchParams = $page.url.searchParams;
    searchParams.set("after", after);
    const res = await getPosts($page.params.path, searchParams);
    res.posts.forEach(addToQueue);
    after = res.after;
  }

  $: if ($tick) next();
  function next() {
    console.log("tick");
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
