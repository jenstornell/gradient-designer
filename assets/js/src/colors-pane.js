class ColorsPane extends HTMLElement {
  constructor() {
    super();
  }

  renderRoot() {
    return `
    <div class="flex gap-4 ${this.allowed() ? "" : "hidden"}">
      <div class="flex flex-col gap-2">
        <div class="text-sm font-bold uppercase">Color: <span data-color
            class="font-normal text-gray-500">red</span>
        </div>
        <palette-colors color="red"></palette-colors>
      </div>

      <div class="flex flex-col gap-2">
        <div class="text-sm font-bold uppercase">Shade: <span data-color
            class="font-normal text-gray-500">red</span>
        </div>
        <palette-shades color="red"></palette-shades>
      </div>
    </div>
    `;
  }

  allowed() {
    return ["from", "via", "to"].includes(store.state.current.tab);
  }

  connectedCallback() {
    this.innerHTML = this.renderRoot();
  }
}

customElements.define("colors-pane", ColorsPane);
