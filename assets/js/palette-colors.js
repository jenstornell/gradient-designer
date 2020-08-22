class PaletteColors extends HTMLElement {
  constructor() {
    super();

    this.innerHTML = this.template();
  }

  template() {
    let html = "";
    const colors = [
      "none",
      "transparent",
      "current",
      "black",
      "white",
      "gray",
      "red",
      "yellow",
      "orange",
      "green",
      "teal",
      "blue",
      "indigo",
      "purple",
      "pink",
    ];
    colors.forEach((color) => {
      html += `<palette-color color="${color}"></palette-color>`;
    });
    return `<div class="inline-grid gap-1" style="grid-auto-rows: 32px; grid-template-columns: repeat(5, 32px);">${html}</div>`;
  }
}

customElements.define("palette-colors", PaletteColors);
