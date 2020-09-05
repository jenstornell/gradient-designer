class PreviewButton extends HTMLElement {
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
    <button class="w-32 h-10 rounded-full focus:outline-none ${this.classes()}"></button>
    `;
  }

  classes() {
    return currentToClasses(this.group, this.name);
  }

  attributeChangedCallback() {
    this.innerHTML = this.renderRoot();
  }
}

customElements.define("preview-button", PreviewButton);
