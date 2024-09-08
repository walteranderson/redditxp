<script>
  import Video from "./video.svelte";
  import Image from "./image.svelte";

  export let post;
</script>

{#if post.video}
  <Video src={post.video.src} />
{:else}
  <Image url={post.url} title={post.title} />
{/if}
