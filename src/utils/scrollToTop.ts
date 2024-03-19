export function scrollToTop() {
  const button = document.querySelector("button#top");
  button?.addEventListener("click", () => {
    console.log(`hit`)
    window.scrollTo({
      top: 0,
      behavior: `smooth`,
    });
  });
}
