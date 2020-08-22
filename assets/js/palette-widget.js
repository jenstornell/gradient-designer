class PaletteWidget extends HTMLElement {
  constructor() {
    super();
    console.log("ellldd");
    this.title = this.getAttribute("title");
    this.color = this.getAttribute("color");
    this.shade = this.getAttribute("shade");
    this.innerHTML = this.template();
  }

  template() {
    console.log("23");
    return `
    <div class="flex gap-4 px-4 py-3 bg-white shadow-sm">
      <div class="flex flex-col gap-3">
        <div class="flex items-center gap-1">
          <div class="text-sm font-bold leading-none uppercase">Color:</div>
          <div class="text-sm text-gray-500 uppercase leading-none">${this.color}</div>
        </div>
        <palette-colors></palette-colors>
      </div>
      <div class="flex flex-col gap-3">
        <div class="flex items-center gap-1">
          <div class="text-sm font-bold leading-none uppercase">Shade:</div>
          <div class="text-sm text-gray-500 uppercase leading-none">${this.shade}</div>
        </div>
        <palette-shades color="blue"></palette-shades>
      </div>
    </div>
    `;
  }
}

customElements.define("palette-widget", PaletteWidget);
