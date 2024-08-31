<script>
	import { onDestroy } from "svelte";

	let sec = 15;
	export let data;

	let interval;
	$: if (sec > 0) {
		interval = setInterval(tick, sec * 1000);
	} else {
		clearInterval(interval);
	}
	onDestroy(() => {
		clearInterval(interval);
	});

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
			toggleInterval();
			return;
		}

		if (queue.length === 0) {
			postIdx++;
		}
	}
	$: console.log(current);
</script>

{#if current}
	{#if current.isVideo}
		<video autoplay loop>
			<source src={current.video.src} />
		</video>
	{:else}
		<img src={current.url} alt={current.title} />
	{/if}
{/if}

<style>
	img {
		width: 100%;
		height: 100%;
	}
</style>
