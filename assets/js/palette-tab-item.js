class PaletteTabItem extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["tab"];
  }

  get tab() {
    return this.getAttribute("tab");
  }

  renderRoot() {
    return `
      <div class="flex relative rounded-t ${this.activeClasses()} px-4 py-2">
        <div class="relative gap-2 flex items-center">
          ${this.tab.capitalize()}
        </div>
      </div>`;
  }

  activeClasses() {
    const currentTab = store.state.current.tab;
    return this.tab == currentTab ? "bg-white border-gray-400 topshadow" : "";
  }

  attributeChangedCallback() {
    this.innerHTML = this.renderRoot();
  }

  connectedCallback() {
    this.innerHTML = this.renderRoot();
  }
}

customElements.define("palette-tab-item", PaletteTabItem);
