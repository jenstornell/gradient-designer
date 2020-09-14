class PreviewGradient extends HTMLElement {
  constructor() {
    super();
  }

  renderRoot() {
    return `
    <div class="h-full ${store.getters.currentToClasses()}"></div>
    `;
  }

  connectedCallback() {
    this.innerHTML = this.renderRoot();
  }

  attributeChangedCallback() {
    this.innerHTML = this.renderRoot();
  }
}

customElements.define("preview-gradient", PreviewGradient);
