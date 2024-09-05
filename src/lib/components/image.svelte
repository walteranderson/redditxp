<script>
  export let url = "";
</script>

<div style={`background-image:url(${url})`} />

<style>
  div {
    width: 100%;
    height: 100%;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
  }
</style>
