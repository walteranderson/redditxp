<script>
  import { Play, Pause, Maximize, Minimize, Eye, EyeOff } from "lucide-svelte";
  import { autoplay } from "$lib/timer";
  import { current, posts } from "$lib/posts";
  import PreviewList from "./preview-list.svelte";
  import IconButton from "./icon-button.svelte";
  import IntervalInput from "./interval-input.svelte";

  let hide = false;
  const toggleHide = () => {
    hide = !hide;
  };

  const toggleAutoplay = () => {
    $autoplay = !$autoplay;
  };

  let fullscreenElement;
  const toggleFullscreen = () => {
    if (fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
  };

  const onKeydown = (event) => {
    switch (event.key) {
      case " ": {
        $autoplay = !$autoplay;
        break;
      }
      case "ArrowLeft": {
        posts.prev();
        break;
      }
      case "ArrowRight": {
        posts.next();
        break;
      }
      case "i":
        window.open($current.permalink, "_blank");
        break;
    }
  };
</script>

<svelte:window on:keydown={onKeydown} />
<svelte:document bind:fullscreenElement />

<div class="controls">
  <div class="left" class:hide>
    <IconButton on:click={toggleAutoplay}>
      {#if $autoplay}
        <Pause />
      {:else}
        <Play />
      {/if}
    </IconButton>
    <IntervalInput />
  </div>

  <div class="center" class:hide>
    <PreviewList />
  </div>

  <div class="right">
    <div class:hide>
      <IconButton on:click={toggleFullscreen}>
        {#if fullscreenElement}
          <Minimize />
        {:else}
          <Maximize />
        {/if}
      </IconButton>
    </div>
    <IconButton on:click={toggleHide}>
      {#if hide}
        <Eye />
      {:else}
        <EyeOff />
      {/if}
    </IconButton>
  </div>
</div>

<style lang="postcss">
  .controls {
    z-index: 10;
    position: absolute;
    bottom: 1rem;
    left: 1rem;
    width: calc(100% - 2rem);
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .left,
  .right {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    align-items: center;
  }
  .center {
    flex: 1;
    display: flex;
    justify-content: center;
  }

  .hide {
    visibility: hidden;
  }
</style>
