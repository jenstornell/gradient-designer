class GradientSquares extends HTMLElement {
  constructor() {
    super();
  }

  get group() {
    return this.getAttribute("group");
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
    for (const name in store.getters[this.group]()) {
      html += `
        <gradient-square group="${this.group}" name="${name}"></gradient-square>
      `;
    }
    return html;
  }

  connectedCallback() {
    this.innerHTML = this.renderRoot();
  }
}

customElements.define("gradient-squares", GradientSquares);
