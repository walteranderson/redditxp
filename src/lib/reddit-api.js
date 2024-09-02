import fetchJsonp from 'fetch-jsonp';

export async function getPosts(path, searchParams) {
	const url = `https://reddit.com/${path}.json?${searchParams.toString()}`;
	const res = await fetchJsonp(url, { jsonpCallback: 'jsonp' });
	const data = await res.json();
	const posts = data.data.children.map(formatItem)
	return {
		posts,
		after: data.data.after,
	};
}

function formatItem(item) {
	const url = item.data.url || item.data.link_url;

	let album = [];
	if (url.includes('reddit.com/gallery/') && item.data.media_metadata) {
		album = extractFromMediaMetadata(item.data);
	}

	let video = null;
	if (item.data.preview?.reddit_video_preview?.fallback_url) {
		video = {
			src: item.data.preview.reddit_video_preview.fallback_url
		}
	}


	return {
		id: item.data.id,
		author: item.data.author,
		title: item.data.title,
		subreddit: item.data.subreddit,
		url,
		album,
		video,
	};
}

function extractFromMediaMetadata(data) {
	const ids = data.gallery_data.items.map(x => x.media_id);

	let album = [];
	for (const id of ids) {
		const m = data.media_metadata[id];
		album.push({
			title: data.title,
			url: decode(m.p[m.p.length - 1].u)
		});
	}
	return album;
}

function decode(str) {
	if (str === undefined) {
		return undefined;
	}
	let parser = new DOMParser();
	return (
		parser.parseFromString(`<!doctype html><body>${str}`, "text/html").body.textContent || undefined
	);
}
