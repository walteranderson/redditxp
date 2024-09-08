<script>
  import { currentIdx, queue, thumbnails } from "$lib/posts";
  import {
    ChevronLeft,
    ChevronRight,
    ChevronFirst,
    ChevronLast,
  } from "lucide-svelte";
  import IconButton from "./icon-button.svelte";
  const onClickPost = (idx) => () => {
    $currentIdx = idx;
  };

  const first = () => {
    $currentIdx = 0;
  };
  const prev = () => {
    if ($currentIdx === 0) return;
    $currentIdx--;
  };
  const next = () => {
    if ($currentIdx + 1 === $queue.length) return;
    $currentIdx++;
  };
  const last = () => {
    $currentIdx = $queue.length - 5;
  };
</script>

<div class="preview-container">
  <IconButton on:click={first}>
    <ChevronFirst />
  </IconButton>
  <IconButton on:click={prev}>
    <ChevronLeft />
  </IconButton>

  <div class="preview-list">
    {#each $thumbnails as post}
      <div class="preview-thumbnail">
        <button
          class:current={$currentIdx === post.idx}
          on:click={onClickPost(post.idx)}
        >
          {post.idx + 1}
        </button>
        <img src={post.thumbnail} alt={post.title} />
      </div>
    {/each}
  </div>

  <IconButton on:click={next}>
    <ChevronRight />
  </IconButton>
  <IconButton on:click={last}>
    <ChevronLast />
  </IconButton>
</div>

<style>
  .preview-container {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .preview-list {
    /* overflow-x: hidden; */
    white-space: nowrap;
    color: white;
    display: flex;
    gap: 1rem;
  }

  button {
    width: 24px;
    height: 24px;
    background-color: rgba(255, 255, 255, 0.15);
    border-radius: 4px;
    border: 0;
    padding: 0;
    cursor: pointer;
    font-size: 0.7rem;
    color: rgba(255, 255, 255, 0.75);
    transition: background-color 200ms ease-out;
  }
  button:hover {
    background-color: rgba(255, 255, 255, 0.4);
  }

  .current {
    background-color: rgba(255, 255, 255, 0.4);
  }

  .preview-thumbnail {
    position: relative;
    display: inline-flex;
  }
  .preview-thumbnail img {
    position: absolute;
    min-width: 70px;
    left: 0;
    bottom: 2.25rem;
    object-fit: cover;
    height: 70px;
    border-radius: 0.25rem;
    opacity: 0;
    transition: opacity 200ms ease-out;
  }
  button:hover + img {
    opacity: 1;
  }
</style>
