class DirectionTabItem extends HTMLElement {
  constructor() {
    super();
  }

  get title() {
    return this.getAttribute("title");
  }

  renderRoot() {
    return `
    <div class="flex relative rounded-t ${this.activeClasses()} px-4 py-2">
        ${this.backdrop()}
        <div class="relative gap-2 flex items-center">
          
          ${this.title}
        </div>
      </div>`;
  }

  backdrop() {
    if (this.active) {
      return `<div class="absolute bg-white h-full w-full left-0 mt-1 top-0"></div>`;
    }
    return "";
  }

  activeClasses() {
    return this.active ? "border-gray-400 border-r border-l border-t" : "";
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.innerHTML = this.renderRoot();
  }

  connectedCallback() {
    this.innerHTML = this.renderRoot();
  }
}

customElements.define("direction-tab-item", DirectionTabItem);
