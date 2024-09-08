import fetchJsonp from 'fetch-jsonp';

export async function getPosts(path, searchParams) {
  const url = `https://www.reddit.com/${path}.json?${searchParams.toString()}`;
  const res = await fetchJsonp(url, { jsonpCallback: 'jsonp' });
  const data = await res.json();
  const posts = data.data.children
    .filter(i => !i.data.stickied)
    .map(formatItem)
    .filter(i => !i.url.includes('gfycat.com'))
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

  let video = getVideo(item.data);

  return {
    id: item.data.id,
    author: item.data.author,
    title: item.data.title,
    subreddit: item.data.subreddit,
    url,
    album,
    video,
    permalink: `https://reddit.com${item.data.permalink}`,
    thumbnail: item.data.thumbnail,
    _item: item
  };
}

function getVideo(data) {
  if (data.preview?.reddit_video_preview?.fallback_url) {
    return {
      src: data.preview.reddit_video_preview.fallback_url
    }
  }

  if (data.media?.reddit_video?.fallback_url) {
    return {
      src: data.media.reddit_video.fallback_url
    }
  }
}

function extractFromMediaMetadata(data) {
  const ids = data.gallery_data.items.map(x => x.media_id);

  let album = [];
  for (const id of ids) {
    const media = data.media_metadata[id];

    let url;
    if (media.m === 'image/gif' && media.s?.gif) {
      url = media.s.gif;
    } else {
      url = decode(media.p[media.p.length - 1].u);
    }

    album.push({
      data,
      title: data.title,
      url,
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
