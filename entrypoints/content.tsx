// entrypoints/example-ui.content/index.tsx
import ReactDOM from "react-dom/client";
import Content from "./content/content";
import { UTIL } from "./util/utils";
import { WxtStorage } from "./util/hooks";
import { CONSTANTS } from "./util/constants";

export default defineContentScript({
  matches: ["*://*/*"],
  cssInjectionMode: 'ui',

  async main(ctx) {
    ctx.addEventListener(document, "keydown", async (e) => {
      // key down event
      if (e.shiftKey) {
        if (e.key === "ArrowDown") {
          if (await WxtStorage.get(CONSTANTS.arrowDownStateKey, true)) {
            UTIL.scrollToBottom();
          }
        } else if (e.key === "ArrowUp") {
          if (await WxtStorage.get(CONSTANTS.arrowUpStateKey, true)) {
            UTIL.scrollToTop();
          }
        }
      }

    });
    const ui = await createShadowRootUi(ctx, {
      name: 'quick-scroll',
      position: "inline",
      anchor: "body",
      onMount: (container) => {
        // Create a root on the UI container and render a component
        // const root = ReactDOM.createRoot(container);
        // root.render(<Content />);
        // container.append(root);

        // Don't mount react app directly on <body>
        const wrapper = document.createElement("div");
        container.append(wrapper);

        const root = ReactDOM.createRoot(wrapper);
        root.render(<Content />);
        return { root, wrapper };
      },
      onRemove: (elements) => {
        elements?.root.unmount();
        elements?.wrapper.remove();
      },
    });

    // Call mount to add the UI to the DOM
    ui.mount();
  },
});
