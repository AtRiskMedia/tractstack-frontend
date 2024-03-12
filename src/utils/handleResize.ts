import { getScrollbarSize } from "@tractstack/helpers";

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
