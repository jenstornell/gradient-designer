class PreviewColors extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["name", "group"];
  }

  get name() {
    return this.getAttribute("name");
  }

  get group() {
    return this.getAttribute("group");
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

    const obj = store.state.gradients[this.group][this.name].classes;

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
    return key == store.state.current.step ? ` active="true"` : "";
  }

  attributeChangedCallback() {
    this.innerHTML = this.renderRoot();
    this.onClick();
  }

  onClick() {
    this.querySelectorAll("palette-color").forEach((item) => {
      item.addEventListener("click", (e) => {
        store.setters.step(e.currentTarget.getAttribute("step"));
      });
    });
  }
}

customElements.define("preview-colors", PreviewColors);
