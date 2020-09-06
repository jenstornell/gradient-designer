class PaletteTabs extends HTMLElement {
  constructor() {
    super();
  }

  renderRoot() {
    return `
    <div class="select-none cursor-default px-4 pt-3 bg-gray-300">
      <div class="flex">   
        <palette-tab-item step="from"></palette-tab-item>
        <palette-tab-item step="via"></palette-tab-item>
        <palette-tab-item step="to"></palette-tab-item>
        <palette-tab-item step="code" class="ml-auto"></palette-tab-item>
        <palette-tab-item step="export"></palette-tab-item>
        <palette-tab-item step="import"></palette-tab-item>
        <palette-tab-item step="about"></palette-tab-item>
      </div>
    </div>
    `;
  }

  connectedCallback() {
    this.innerHTML = this.renderRoot();
    this.onClick();
  }

  onClick() {
    this.querySelectorAll("palette-tab-item").forEach((item) => {
      item.addEventListener("click", this.handleClick.bind(this), false);
    });
  }

  handleClick(e) {
    store.setters.step(e.currentTarget.getAttribute("step"));
  }
}

customElements.define("palette-tabs", PaletteTabs);
