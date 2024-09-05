<script>
  export let url = "";
  export let title = "";
</script>

<img src={url} alt={title} />

<style>
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
</style>
