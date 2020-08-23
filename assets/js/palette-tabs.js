class PaletteTabs extends HTMLElement {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
  }

  renderRoot() {
    return `
    <div class="select-none cursor-default px-4 pt-3 bg-white">
      <div class="border-b flex">   
        <palette-tab-item name="from" active="true" color="none" title="From"></palette-tab-item>
        <palette-tab-item name="via" color="none" title="Via"></palette-tab-item>
        <palette-tab-item name="to" color="none" title="To"></palette-tab-item>
        <direction-tab-item title="Direction"></direction-tab-item>
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

    store.step = e.currentTarget.getAttribute("name");

    const data = Object.assign(
      {
        color: "red",
        shade: null,
      },
      store[store.state][store.step]
    );
    document.querySelector("palette-widget").setAttribute("color", data.color);
  }
}

customElements.define("palette-tabs", PaletteTabs);
