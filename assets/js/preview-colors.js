class PreviewColors extends HTMLElement {
  constructor() {
    super();
  }

  renderRoot() {
    return `
    <div class="flex gap-1">
        ${this.items()}
    </div>
    `;
  }

  items() {
    let html = "";

    const obj = store.getters.currentGradient().classes;

    for (const key in obj) {
      const item = obj[key];
      html += `<palette-color
      ${this.active(key)}
      step="${key}"
      class="w-10 h-10"
      color="${item.color}"
      shade="${item.shade}"></palette-color>`;
    }

    return html;
  }

  active(key) {
    return key == store.state.current.tab ? ` active="true"` : "";
  }

  connectedCallback() {
    this.innerHTML = this.renderRoot();
    this.onClick();
  }

  onClick() {
    this.querySelectorAll("palette-color").forEach((item) => {
      item.addEventListener("click", (e) => {
        store.setters.tab(e.currentTarget.getAttribute("step"));
      });
    });
  }
}

customElements.define("preview-colors", PreviewColors);
