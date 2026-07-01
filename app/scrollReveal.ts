export function initScrollReveal() {
  const elements = Array.from(
    document.querySelectorAll<HTMLElement>("[data-scroll-reveal]")
  );
  let lastScrollY = window.scrollY;

  document.documentElement.classList.add("scroll-reveal-ready");

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    elements.forEach((element) => element.classList.add("is-visible"));
    return () => {};
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const element = entry.target as HTMLElement;
        const currentScrollY = window.scrollY;
        const direction = currentScrollY >= lastScrollY ? "down" : "up";

        document.documentElement.classList.toggle("scrolling-down", direction === "down");
        document.documentElement.classList.toggle("scrolling-up", direction === "up");
        lastScrollY = currentScrollY;

        if (!entry.isIntersecting) {
          element.style.transitionDelay = "";
          element.classList.remove("is-visible");
          return;
        }

        element.style.transitionDelay = element.dataset.scrollDelay || "";
        element.classList.add("is-visible");
      });
    },
    {
      rootMargin: "-8% 0px -8% 0px",
      threshold: 0.08,
    }
  );

  elements.forEach((element) => observer.observe(element));

  return () => observer.disconnect();
}
