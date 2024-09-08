<button on:click>
  <slot />
</button>

<style>
  button {
    background: none;
    border: 0;
    padding: 0;
    cursor: pointer;
    color: rgba(255, 255, 255, 0.5);
    display: flex;
    transition: color 200ms ease-out;
  }
  button:hover {
    color: rgba(255, 255, 255, 0.75);
  }
</style>
