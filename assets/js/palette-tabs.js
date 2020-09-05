class PaletteTabs extends HTMLElement {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
  }

  renderRoot() {
    return `
    <div class="select-none cursor-default px-4 pt-3 bg-gray-300">
      <div class="flex">   
        <palette-tab-item name="from" title="From" active="true"></palette-tab-item>
        <palette-tab-item name="via" title="Via"></palette-tab-item>
        <palette-tab-item name="to" title="To"></palette-tab-item>
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
      item.addEventListener("click", this.handleClick, false);
    });
  }

  handleClick(e) {
    const el = this.querySelector(`palette-tab-item[active="true"]`);
    el.removeAttribute("active");
    e.currentTarget.setAttribute("active", "true");
  }
}

customElements.define("palette-tabs", PaletteTabs);
