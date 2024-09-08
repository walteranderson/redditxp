<script>
  import { Play, Pause, Maximize, Minimize, Eye, EyeOff } from "lucide-svelte";
  import { interval, autoplay } from "$lib/timer";
  import { currentIdx, queue } from "$lib/posts";
  import PreviewList from "./preview-list.svelte";
  import IconButton from "./icon-button.svelte";

  function debounce(func, timeout = 300) {
    let ref;
    return (...args) => {
      clearTimeout(ref);
      ref = setTimeout(() => func.apply(this, args), timeout);
    };
  }

  let hide = false;
  const onToggleHide = () => {
    hide = !hide;
  };

  const onToggleAutoplay = () => {
    $autoplay = !$autoplay;
  };

  const onTimeChanged = debounce((event) => {
    $interval = event.target.value * 1000;
  }, 800);

  const onKeydown = (event) => {
    switch (event.key) {
      case " ": {
        $autoplay = !$autoplay;
        break;
      }
      case "ArrowLeft": {
        if ($currentIdx === 0) return;
        $currentIdx--;
        break;
      }
      case "ArrowRight": {
        if ($currentIdx + 1 === $queue.length) return;
        $currentIdx++;
        break;
      }
    }
  };

  let fullscreenElement;
  const toggleFullscreen = () => {
    if (fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
  };
</script>

<svelte:window on:keydown={onKeydown} />
<svelte:document bind:fullscreenElement />

<div class="controls">
  <div class="options" class:hide>
    <IconButton on:click={toggleFullscreen}>
      {#if fullscreenElement}
        <Minimize />
      {:else}
        <Maximize />
      {/if}
    </IconButton>
    <IconButton on:click={onToggleAutoplay}>
      {#if $autoplay}
        <Pause />
      {:else}
        <Play />
      {/if}
    </IconButton>
    <input
      type="number"
      value={$interval / 1000}
      on:input={onTimeChanged}
      on:focus={(e) => e.target.select()}
    />
  </div>

  <div class="previews" class:hide>
    <PreviewList />
  </div>

  <div class="hide-controls">
    <IconButton on:click={onToggleHide}>
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

  .options {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    align-items: center;
  }

  input {
    font-size: 1rem;
    border: 0;
    border-radius: 4px;
    color: white;
    background-color: rgba(255, 255, 255, 0.15);
    padding: 0.25rem 0.5rem;
    width: 18px;
    transition: background-color 200ms ease-out;
  }
  input:hover {
    background-color: rgba(255, 255, 255, 0.25);
  }
  input:focus {
    outline: none;
  }
  input[type="number"] {
    -moz-appearance: textfield;
    appearance: textfield;
    margin: 0;
  }
  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  .previews {
    flex: 1;
    display: flex;
    justify-content: center;
  }

  .hide {
    visibility: hidden;
  }
</style>
