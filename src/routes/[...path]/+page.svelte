<script>
	import { onDestroy } from "svelte";

	let sec = 10;
	export let data;

	let interval;
	$: if (sec > 0) {
		clearInterval(interval);
		interval = setInterval(tick, sec * 1000);
	} else {
		clearInterval(interval);
	}
	onDestroy(() => {
		if (interval) {
			clearInterval(interval);
		}
	});

	console.log('count', data.posts.length);
	let postIdx = 0;
	let current;
	let queue = [];

	function add(post) {
		if (!post) return;
		post.isAlbum ? queue.push(...post.album) : queue.push(post);
	}

	tick();
	function tick() {
		if (queue.length === 0) {
			add(data.posts[postIdx]);
		}

		current = queue.shift();
		if (!current) {
			console.log("no more posts");
			console.log({ current, postIdx, queue });
			sec = 0;
			return;
		}

		if (queue.length === 0) {
			postIdx++;
		}
	}
	$: console.log(current);
</script>

<!--
<input bind:value={sec} type="number" />
-->

<div class="container">
	{#if current}
		{#if current.isVideo}
			<video autoplay loop>
				<source src={current.video.src} />
			</video>
		{:else}
			<div class="img" style={`background-image:url(${current.url})`} />
		{/if}
	{/if}
</div>

<style>
	:global(html, body) {
		height: 100%;
		margin: 0;
	}
	.container {
		background-color: black;
		height: 100%;
	}
	.img {
		width: 100%;
		height: 100%;
		background-size: contain;
		background-position: center;
		background-repeat: no-repeat;
	}
</style>
