class PaletteShades extends HTMLElement {
  constructor() {
    super();

    this.color = this.getAttribute("color");
    this.innerHTML = this.template();
  }

  static get observedAttributes() {
    return ["color"];
  }

  template() {
    let html = "";
    const shades = [
      "100",
      "200",
      "300",
      "400",
      "500",
      "600",
      "700",
      "800",
      "900",
    ];
    shades.forEach((shade) => {
      html += `
        <palette-color color="${this.color}" shade="${shade}" active="true"></palette-color>
      `;
    });
    return `
      <div class="inline-grid gap-1" style="grid-auto-rows: 32px; grid-template-columns: repeat(5, 32px);">
        ${html}
      </div>
    `;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.querySelectorAll("palette-color").forEach((item) => {
      item.setAttribute("color", newValue);
    });
  }
}

customElements.define("palette-shades", PaletteShades);
