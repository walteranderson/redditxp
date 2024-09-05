<script>
  import { getPosts } from "$lib/reddit-api";
  import { page } from "$app/stores";
  import Controls from "$lib/components/controls.svelte";
  import Video from "$lib/components/video.svelte";
  import Image from "$lib/components/image.svelte";
  import { autoplay, tick } from "$lib/timer-store";

  export let data;

  let currentIdx = 0;
  let queue = [];
  let after = data.after;

  data.posts.forEach(addToQueue);
  function addToQueue(post) {
    if (post.album.length) {
      queue.push(...post.album);
    } else {
      queue.push(post);
    }
  }

  async function loadMore() {
    const searchParams = $page.url.searchParams;
    searchParams.set("after", after);
    const res = await getPosts($page.params.path, searchParams);
    res.posts.forEach(addToQueue);
    after = res.after;
  }

  const onKeydown = (event) => {
    switch (event.key) {
      case "ArrowUp": {
        $autoplay = !$autoplay;
        break;
      }
      case "ArrowLeft": {
        if (currentIdx === 0) return;
        currentIdx--;
        // timer.restart();
        break;
      }
      case "ArrowRight": {
        if (currentIdx + 1 === queue.length) return;
        currentIdx++;
        // timer.restart();
        break;
      }
    }
  };

  $: if ($tick) currentIdx++;
  $: if (currentIdx + 2 === queue.length) loadMore();
  $: current = queue[currentIdx];
</script>

<svelte:window on:keydown={onKeydown} />

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
