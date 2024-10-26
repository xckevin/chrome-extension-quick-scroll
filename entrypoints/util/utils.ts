export const UTIL = {
  getCurrentTabDomain: async () => {
    const [tab] = await browser.tabs.query({
      active: true,
      lastFocusedWindow: true,
    });
    const url = new URL(tab.url);
    return url.hostname;
  },
  scrollToTop: () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  },
  scrollToBottom: () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  },
};
