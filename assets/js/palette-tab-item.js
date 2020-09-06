class PaletteTabItem extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["step"];
  }

  get step() {
    return this.getAttribute("step");
  }

  renderRoot() {
    return `
      <div class="flex relative rounded-t ${this.activeClasses()} px-4 py-2">
        <div class="relative gap-2 flex items-center">
          ${this.step.capitalize()}
        </div>
      </div>`;
  }

  activeClasses() {
    const currentStep = store.state.current.step;
    return this.step == currentStep ? "bg-white border-gray-400 topshadow" : "";
  }

  attributeChangedCallback() {
    this.innerHTML = this.renderRoot();
  }

  connectedCallback() {
    this.innerHTML = this.renderRoot();
  }
}

customElements.define("palette-tab-item", PaletteTabItem);
