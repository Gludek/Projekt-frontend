export function debounce(func: Function, wait: number, immediate?: boolean) {
  let timeout: number | null;
  return function () {
    const args = arguments;
    const later = function () {
      timeout = null;
      if (!immediate) func.apply(this, args);
    };
    const callNow = immediate && !timeout;
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(this, args);
  };
}
