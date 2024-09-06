<script>
  import { CircleEllipsis, Play, Pause } from "lucide-svelte";
  import { interval, autoplay } from "$lib/timer";
  import { currentIdx, queue } from "$lib/posts";

  function debounce(func, timeout = 300) {
    let ref;
    return (...args) => {
      clearTimeout(ref);
      ref = setTimeout(() => func.apply(this, args), timeout);
    };
  }

  let open = false;
  const toggleOpen = () => {
    open = !open;
  };

  const onToggleAutoplay = () => {
    $autoplay = !$autoplay;
  };

  const onTimeChanged = debounce((event) => {
    $interval = event.target.value * 1000;
  }, 800);

  const onInputKeydown = (event) => {
    if (event.key === "Enter") {
      toggleOpen();
    }
  };

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
</script>

<svelte:window on:keydown={onKeydown} />

<div class="controls">
  {#if open}
    <div class="menu">
      <div class="menu-item">
        <button class="autoplay-button" on:click={onToggleAutoplay}>
          {#if $autoplay}
            <Pause />
          {:else}
            <Play />
          {/if}
        </button>
        <input
          type="number"
          value={$interval / 1000}
          on:input={onTimeChanged}
          on:keydown={onInputKeydown}
        />
      </div>
    </div>
  {/if}

  <button class="fab" on:click={toggleOpen}>
    <CircleEllipsis size={32} />
  </button>
</div>

<style lang="postcss">
  .controls {
    z-index: 99;
    position: absolute;
    bottom: 1rem;
    left: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: start;
  }

  button {
    background: none;
    border: 0;
    padding: 0;
    cursor: pointer;
  }
  .fab {
    color: white;
  }
  .autoplay-button {
    display: flex;
  }

  .menu {
    background-color: rgba(255, 255, 255, 0.85);

    padding: 0.75rem 1rem;
    border-radius: 0.25rem;

    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .menu-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
  }
</style>
