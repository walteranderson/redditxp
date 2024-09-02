<script>
  import { onMount } from "svelte";
  import { getPosts } from "$lib/reddit-api";
  import { page } from "$app/stores";
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

  // ----
  let time = 30000;
  let ref;
  onMount(() => {
    start();
    return () => {
      stop();
    };
  });
  function start() {
    console.log("start");
    clearInterval(ref);
    ref = setInterval(tick, time);
  }
  function stop() {
    console.log("stop");
    clearInterval(ref);
  }
  function tick() {
    console.log("tick", { current, queue });
    current++;
    if (current + 1 === queue.length) {
      loadMore();
    }
  }
  // ----

  const onKeydown = (event) => {
    switch (event.key) {
      case "ArrowLeft":
        if (current === 0) return;
        current--;
        start();
        break;
      case "ArrowRight":
        current++;
        start();
        break;
    }
  };

  $: console.log(queue[current]);
</script>

<svelte:window on:keydown={onKeydown} />

<Controls bind:time />

{#if queue[current]}
  {@const p = queue[current]}
  {#if p.video}
    <video autoplay loop>
      <track kind="captions" />
      <source src={p.video.src} />
    </video>
  {:else}
    <div class="img" style={`background-image:url(${p.url})`} />
  {/if}
{/if}

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
</style>
