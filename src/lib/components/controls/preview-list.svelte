<script>
  import { currentIdx, queue } from "$lib/posts";
  const onClickPost = (idx) => () => {
    $currentIdx = idx;
  };
</script>

<div class="preview-list">
  {#each $queue as post, idx}
    <span class="preview-thumbnail">
      <button class:current={$currentIdx === idx} on:click={onClickPost(idx)}>
      </button>
      <img src={post.thumbnail} alt={post.title} />
    </span>
  {/each}
</div>

<style>
  .preview-list {
    /* overflow-x: hidden; */
    white-space: nowrap;
    color: white;
  }

  button {
    width: 24px;
    height: 24px;
    background-color: rgba(255, 255, 255, 0.15);
    border-radius: 4px;
    border: 0;
    padding: 0;
    cursor: pointer;
    color: white;
    margin-right: 1rem;
    transition: background-color 200ms ease-out;
  }
  button:hover {
    background-color: rgba(255, 255, 255, 0.25);
  }

  .current {
    background-color: rgba(255, 255, 255, 0.4);
  }

  .preview-thumbnail {
    position: relative;
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
