class PreviewHero extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["current"];
  }

  get current() {
    return this.getAttribute("current");
  }

  renderRoot() {
    return `
    <div class="bg-gradient-to-r ${this.classes()}">ok</div>
    `;
  }

  classes() {
    const classes = currentToClasses(this.current);
    return classes;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.innerHTML = this.renderRoot();
  }

  connectedCallback(name, oldval, newval) {
    //this.innerHTML = this.renderRoot();
  }
}

customElements.define("preview-hero", PreviewHero);
