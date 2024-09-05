<script>
  export let src = "";
</script>

{#key src}
  <video autoplay loop>
    <track kind="captions" />
    <source {src} />
  </video>
{/key}

<style>
  video {
    width: 100%;
    height: 100%;
  }
</style>
