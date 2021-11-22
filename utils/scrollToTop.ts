const makeScrollToTop = () => {
  let timer: ReturnType<typeof setTimeout>;

  const scrollToTop = () => {
    const top = Math.max(document.body.scrollTop, document.documentElement.scrollTop);

    if (top > 0) {
      window.scrollTo(0, Math.floor(top / 1.5));
      timer = setTimeout(scrollToTop, 15);
    } else {
      clearTimeout(timer);
    }
  };

  return scrollToTop;
};

export default makeScrollToTop();
