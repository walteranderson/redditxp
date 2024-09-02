<script>
  import { getPosts } from "$lib/reddit-api";
  import { page } from "$app/stores";
  import { timer } from "$lib/timer";
  import Controls from "$lib/controls.svelte";

  export let data;

  let current = 0;
  let queue = [];

  data.posts.forEach(addToQueue);

  function addToQueue(post) {
    if (post.album.length) {
      queue.push(...post.album);
    } else {
      queue.push(post);
    }
  }

  let after = data.after;
  async function loadMore() {
    const searchParams = $page.url.searchParams;
    searchParams.set("after", after);
    const res = await getPosts($page.params.path, searchParams);
    res.posts.forEach(addToQueue);
    after = res.after;
  }

  $: if ($timer.tick) {
    current++;
  }

  $: if (current + 2 === queue.length) {
    loadMore();
  }

  const onKeydown = (event) => {
    switch (event.key) {
      case "ArrowLeft": {
        if (current === 0) return;
        current--;
        break;
      }
      case "ArrowRight": {
        if (current + 1 === queue.length) return;
        current++;
        break;
      }
    }
  };

  $: console.log("current", queue[current]);
  $: console.log("queue", queue);
</script>

<svelte:window on:keydown={onKeydown} />

<Controls />

{#each queue as item, idx}
  <div class="item" class:hidden={idx !== current}>
    {#if item.video}
      <video autoplay loop>
        <track kind="captions" />
        <source src={item.video.src} />
      </video>
    {:else}
      <div class="img" style={`background-image:url(${item.url})`} />
    {/if}
  </div>
{/each}

<style>
  :global(html, body) {
    background-color: black;
    height: 100%;
    margin: 0;
    font-family: Helvetica, Arial, sans-serif;
  }
  .img {
    width: 100%;
    height: 100%;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
  }
  .item {
    height: 100%;
  }
  .hidden {
    display: none;
  }
</style>
