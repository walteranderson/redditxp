<script>
  import { CircleEllipsis } from "lucide-svelte";

  export let time; // ms

  let open = false;
  const onClick = () => {
    open = !open;
  };
</script>

{#if open}
  <div class="menu">
    <input type="number" bind:value={time} />
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
    background-color: rgba(255, 255, 255, 0.75);

    padding: 0.75rem 1rem;
    border-radius: 0.25rem;

    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
</style>
