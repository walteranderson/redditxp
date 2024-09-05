<script>
  export let src = "";
</script>

<video autoplay loop>
  <track kind="captions" />
  <source {src} />
</video>
