class ExportCode extends HTMLElement {
  constructor() {
    super();
  }

  renderRoot() {
    return `
    <pre><code class="language-json">p { color: red }</code></pre>`;
  }

  activeClasses() {
    const currentStep = store.state.current.step;
    return this.step == currentStep ? "bg-white border-gray-400 topshadow" : "";
  }

  attributeChangedCallback() {
    this.innerHTML = this.renderRoot();
  }

  connectedCallback() {
    this.innerHTML = this.renderRoot();
  }
}

customElements.define("export-code", ExportCode);
