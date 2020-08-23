class PreviewGradient extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["from", "via", "to"];
  }

  get from() {
    return this.getAttribute("from");
  }

  renderRoot() {
    return `
    <div class="bg-gradient-to-r from-${this.from}">sfds</div>
    `;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.innerHTML = this.renderRoot();
  }

  connectedCallback(name, oldval, newval) {
    this.innerHTML = this.renderRoot();
  }
}

customElements.define("preview-gradient", PreviewGradient);
