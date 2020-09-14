class PaneProfile extends HTMLElement {
  constructor() {
    super();
  }

  renderRoot() {
    return `
    <div class="flex gap-4 ${
      store.state.current.tab == "profile" ? "" : "hidden"
    }">
      <div class="flex flex-col gap-2">
        <label class="text-sm font-bold uppercase flex flex-col gap-2">
          Gradient title
          <input data-title type="text" class="shadow-inner bg-gray-300 focus:outline-none p-2" spellcheck="false" autocomplete="off" style="max-width: 300px;">
        </label>
      </div>
      <div class="flex flex-col gap-2">
        <label class="text-sm font-bold uppercase flex flex-col gap-2">
          Tailwind class prefix
          <input data-prefix type="text" class="shadow-inner bg-gray-300 focus:outline-none p-2" spellcheck="false" autocomplete="off" style="max-width: 300px;">
        </label>
      </div>
      <div class="flex flex-col gap-2">
        <label class="text-sm font-bold uppercase flex flex-col gap-2">
         Delete gradient
          <button data-delete class="border border-red-500 hover:border-red-800 from-red-700 via-red-700 to-red-500 bg-gradient-to-t text-white rounded focus:outline-none px-4 py-2">Delete current</button>
        </label>
      </div>
      <div class="flex flex-col gap-2">
        <label class="text-sm font-bold uppercase flex flex-col gap-2">
         &nbsp;
          <button data-delete-all class="border border-red-500 hover:border-red-800 from-red-700 via-red-700 to-red-500 bg-gradient-to-t text-white rounded focus:outline-none px-4 py-2">Delete all</button>
        </label>
      </div>
    </div>
    `;
  }

  connectedCallback() {
    this.innerHTML = this.renderRoot();
    //this.onClick();
    this.onDelete();
    this.onDeleteAll();
    this.onTitle();
    this.onPrefix();
  }

  onDelete() {
    this.querySelector("[data-delete]").addEventListener("click", () => {
      console.log("del");
      if (!confirm("Delete this gradient?")) return;

      const current = store.state.current;
      delete store.state.gradients[current.group][current.gradient];

      // If no gradients add the default one
      if (this.isEmpty(store.state.gradients[current.group])) {
        store.setters.default(store.state.settings.default);
        store.setters.currentAll({
          gradient: "default",
          group: "custom",
          tab: "from",
          prefix: "",
        });
        store.actions.render('gradient-squares[group="custom"]');
        document
          .querySelector("gradient-square")
          .setAttribute("active", "true");
      }
    });
  }

  onDeleteAll() {
    this.querySelector("[data-delete-all]").addEventListener("click", () => {
      console.log("del all");
      if (!confirm("Delete all custom gradients?")) return;

      store.state.gradients["custom"] = {};

      // Add the default one
      store.setters.default(store.state.settings.default);
      store.setters.currentAll({
        gradient: "default",
        group: "custom",
        tab: "from",
        prefix: "",
      });
      store.actions.render('gradient-squares[group="custom"]');
      document.querySelector("gradient-square").setAttribute("active", "true");
    });
  }

  onTitle() {
    this.querySelector("[data-title]").addEventListener("keyup", (e) => {
      store.setters.title(e.currentTarget.value);
    });
  }

  onPrefix() {
    this.querySelector("[data-prefix]").addEventListener("keyup", (e) => {
      store.state.current.prefix = e.currentTarget.value;
    });
  }

  isEmpty(obj) {
    return Object.keys(obj).length === 0;
  }

  /*
  onClick() {
    this.querySelectorAll("palette-tab-item").forEach((item) => {
      item.addEventListener("click", this.handleClick.bind(this), false);
    });
  }

  handleClick(e) {
    store.setters.tab(e.currentTarget.getAttribute("tab"));
  }*/
}

customElements.define("pane-profile", PaneProfile);
