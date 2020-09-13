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
          <button data-delete class="border border-red-500 hover:border-red-800 from-red-700 via-red-700 to-red-500 bg-gradient-to-t text-white rounded-full focus:outline-none px-4 py-2">Delete</button>
        </label>
      </div>
    </div>
    `;
  }

  connectedCallback() {
    this.innerHTML = this.renderRoot();
    //this.onClick();
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
