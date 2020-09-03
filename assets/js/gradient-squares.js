class GradientSquares extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["time"];
  }

  get group() {
    return this.getAttribute("group");
  }

  get time() {
    return this.getAttribute("time");
  }

  renderRoot() {
    return `
    <div class="flex flex-col gap-1">
    ${this.renderItems()}
    </div>
    `;
  }

  renderItems() {
    let html = "";
    for (const key in store.getters[this.group]()) {
      html += `
        <gradient-square group="${this.group}" key="${key}"></gradient-square>
      `;
    }
    return html;
  }

  connectedCallback() {
    this.innerHTML = this.renderRoot();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.innerHTML = this.renderRoot();
  }
}

customElements.define("gradient-squares", GradientSquares);
