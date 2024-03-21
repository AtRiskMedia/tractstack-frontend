export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(` `);
}

// from https://tobbelindstrom.com/blog/measure-scrollbar-width-and-height/
export const getScrollbarSize = () => {
  const { body } = document;
  const scrollDiv = document.createElement(`div`);

  // Append element with defined styling
  scrollDiv.setAttribute(
    `style`,
    `width: 1337px; height: 1337px; position: absolute; left: -9999px; overflow: scroll;`
  );
  body.appendChild(scrollDiv);
  // Collect width & height of scrollbar
  const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
  // Remove element
  body.removeChild(scrollDiv);
  return scrollbarWidth;
};

export function handleResize() {
  const scrollBarOffset = getScrollbarSize();
  const thisWidth = window?.innerWidth;
  const thisScale =
    thisWidth < 801
      ? (thisWidth - scrollBarOffset) / 601
      : thisWidth < 1367
        ? (thisWidth - scrollBarOffset) / 1081
        : (thisWidth - scrollBarOffset) / 1921;
  document.documentElement.style.setProperty(`--scale`, thisScale.toString());
}

export function scrollToTop() {
  const button = document.querySelector("button#top");
  button?.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: `smooth`,
    });
  });
}

export function closeContextPane() {
  const button = document.querySelector("button#close");
  button?.setAttribute("href", document.referrer);
  button?.addEventListener("click", () => {
    history.back();
    return false;
  });
  const button2 = document.querySelector("button#close-main");
  button2?.setAttribute("href", document.referrer);
  button2?.addEventListener("click", () => {
    history.back();
    return false;
  });
}
