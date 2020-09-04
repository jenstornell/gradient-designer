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
        ${this.backdrop()}
        <div class="relative gap-2 flex items-center">
          <palette-color color="${
            this.color
          }" ${this.shadeValue()} class="block w-4 h-4"></palette-color>  
          ${this.title}
        </div>
      </div>`;
  }

  shadeValue() {
    return this.shade ? `shade="${this.shade}"` : "";
  }

  backdrop() {
    if (this.active) {
      return `<div class="absolute bg-white h-full w-full left-0 mt-1 top-0"></div>`;
    }
    return "";
  }

  activeClasses() {
    return this.active ? "border-gray-500 border-r border-l border-t" : "";
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.innerHTML = this.renderRoot();
  }

  connectedCallback() {
    this.innerHTML = this.renderRoot();
  }
}

customElements.define("palette-tab-item", PaletteTabItem);
