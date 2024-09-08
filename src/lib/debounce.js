export function debounce(func, timeout = 300) {
  let ref;
  return (...args) => {
    clearTimeout(ref);
    ref = setTimeout(() => func.apply(this, args), timeout);
  };
}
