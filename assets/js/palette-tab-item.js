class PaletteTabItem extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["color", "shade", "active"];
  }

  get active() {
    return this.getAttribute("active") == "true" ? true : false;
  }

  get color() {
    return this.getAttribute("color");
  }

  get shade() {
    return this.getAttribute("shade");
  }

  get title() {
    return this.getAttribute("title");
  }

  renderRoot() {
    return `
      <div class="flex relative rounded-t ${this.activeClasses()} px-4 py-2">
        <div class="relative gap-2 flex items-center">
          ${this.title}
        </div>
      </div>`;
  }

  shadeValue() {
    return this.shade ? `shade="${this.shade}"` : "";
  }

  activeClasses() {
    return this.active ? "bg-white border-gray-400 topshadow" : "";
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.innerHTML = this.renderRoot();
  }

  connectedCallback() {
    this.innerHTML = this.renderRoot();
  }
}

customElements.define("palette-tab-item", PaletteTabItem);
