export function initScrollHandlers() {
  if (typeof window === "undefined") return;

  const stickyHeader = document.getElementById("sticky-header");
  const scrollUp = document.getElementById("scrollUp");
  let lastScroll = 0;

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    // Handle sticky header
    if (stickyHeader) {
      if (currentScroll > 100) {
        if (currentScroll > lastScroll) {
          // Scrolling down
          stickyHeader.style.transform = "translateY(-100%)";
        } else {
          // Scrolling up
          stickyHeader.style.transform = "translateY(0)";
        }
      } else {
        stickyHeader.style.transform = "translateY(-100%)";
      }
    }

    // Handle back to top button
    if (scrollUp) {
      if (currentScroll > 300) {
        scrollUp.classList.add("active-progress");
      } else {
        scrollUp.classList.remove("active-progress");
      }
    }

    lastScroll = currentScroll;
  });

  // Scroll to top when clicking the button
  scrollUp?.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}
