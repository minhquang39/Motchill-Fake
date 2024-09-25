const handlePreNext = (pre, next, element) => {
  if (pre) {
    pre.onclick = function (e) {
      const elementChildWidth = element.querySelector("div").clientWidth;
      element.scrollLeft -= elementChildWidth;
    };
  }
  if (next) {
    next.onclick = function (e) {
      const elementChildWidth = element.querySelector("div").clientWidth;
      element.scrollLeft += elementChildWidth;
    };
  }
};

window.handlePreNext = handlePreNext;

export default handlePreNext;
