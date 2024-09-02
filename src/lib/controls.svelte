<script>
  import { CircleEllipsis, TimerReset } from "lucide-svelte";
  import { debounce } from "$lib/debounce";

  export let time; // ms

  let seconds = time / 1000;

  let open = false;
  const onClick = () => {
    open = !open;
  };

  const onTimeChanged = debounce((event) => {
    time = event.target.value * 1000;
  });
</script>

{#if open}
  <div class="menu">
    <div class="menu-item">
      <TimerReset />
      <input type="number" bind:value={seconds} on:input={onTimeChanged} />
    </div>
  </div>
{/if}

<button on:click={onClick}>
  <CircleEllipsis size={32} />
</button>

<style lang="postcss">
  button {
    position: absolute;
    bottom: 1rem;
    cursor: pointer;
    left: 1rem;
    color: white;
    background: none;
    border: 0;
  }

  .menu {
    position: absolute;
    bottom: 4.5rem;
    left: 1rem;
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
