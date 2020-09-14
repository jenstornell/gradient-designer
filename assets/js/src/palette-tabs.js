class PaletteTabs extends HTMLElement {
  constructor() {
    super();
  }

  renderRoot() {
    return `
    <div class="select-none cursor-default px-4 pt-3 bg-gray-300">
      <div class="flex">   
        <palette-tab-item tab="from"></palette-tab-item>
        <palette-tab-item tab="via"></palette-tab-item>
        <palette-tab-item tab="to"></palette-tab-item>
        <palette-tab-item tab="direction"></palette-tab-item>
        <palette-tab-item tab="profile"></palette-tab-item>
        <palette-tab-item tab="code" class="ml-auto"></palette-tab-item>
        <palette-tab-item tab="export"></palette-tab-item>
        <palette-tab-item tab="import"></palette-tab-item>
        <palette-tab-item tab="about"></palette-tab-item>
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
    store.setters.tab(e.currentTarget.getAttribute("tab"));
  }
}

customElements.define("palette-tabs", PaletteTabs);
