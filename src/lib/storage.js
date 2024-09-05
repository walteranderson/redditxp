const KEY = 'redditxp:storage';

const initialValues = {
  autoplay: true,
  interval: 30_000,
};

export function get(key = null) {
  let data = JSON.parse(localStorage.getItem(KEY));
  if (!data) {
    set(initialValues);
    data = initialValues;
  }
  if (!key) return data;
  return data[key];
}

export function set(data) {
  localStorage.setItem(KEY, JSON.stringify(data || initialValues));
  return data;
}
