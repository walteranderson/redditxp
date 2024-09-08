<script>
  export let src = "";
</script>

{#key src}
  <video
    loop
    muted
    autoplay
    playsinline
    preload="auto"
  >
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
