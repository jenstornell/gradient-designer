class PaletteShades extends HTMLElement {
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
        <palette-color color="${this.color}" shade="${shade}"></palette-color>
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

  connectedCallback() {
    this.innerHTML = this.renderRoot();
    //this.onClick();
    this.querySelector('[shade="500"]').setAttribute("active", "true");
  }

  /*onClick() {
    this.querySelectorAll("palette-color").forEach((item) => {
      item.addEventListener("click", (e) => {
        const current = e.currentTarget;

        store[store.state][store.step] = {
          color: current.color,
          shade: current.shade,
        };
      });
    });
  }*/
}

customElements.define("palette-shades", PaletteShades);
