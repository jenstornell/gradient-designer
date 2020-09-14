class PaletteColors extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["color"];
  }

  get color() {
    return this.getAttribute("color");
  }

  renderRoot() {
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

  attributeChangedCallback() {
    this.innerHTML = this.renderRoot();
    this.onClick();
  }

  connectedCallback() {
    this.innerHTML = this.renderRoot();
    this.onClick();
  }

  onClick() {
    this.querySelectorAll("palette-color").forEach((el) => {
      el.addEventListener("click", (e) => {
        const color = e.currentTarget.getAttribute("color");

        store.setters.color(color);
      });
    });
  }
}

customElements.define("palette-colors", PaletteColors);
