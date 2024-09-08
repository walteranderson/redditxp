<script>
  import { debounce } from "$lib/debounce";
  import { interval } from "$lib/timer";
  const onTimeChanged = debounce((event) => {
    $interval = event.target.value * 1000;
  }, 800);
</script>

<input
  type="number"
  value={$interval / 1000}
  on:input={onTimeChanged}
  on:focus={(e) => e.target.select()}
/>

<style>
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
</style>
