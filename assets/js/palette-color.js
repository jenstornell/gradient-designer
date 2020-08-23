class PaletteColor extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["color", "shade", "active"];
  }

  /*** GETTERS */
  get color() {
    return this.getAttribute("color");
  }

  get shade() {
    return this.getAttribute("shade") ? this.getAttribute("shade") : "500";
  }

  get active() {
    return this.getAttribute("active") == "true" ? true : false;
  }

  /*** RENDERS */
  renderRoot() {
    return `
    <div class="${this.classes()}" title="${this.color}">
      <div data-extra class="h-full contains">${this.renderExtra()}</div>
      <div data-dot class="contains h-full absolute top-0 left-0 w-full">${this.renderActive()}</div>
    </div>
    `;
  }

  renderActive() {
    if (!this.active || this.color == "none") return "";

    let color = null;
    if (["current", "black"].includes(this.color)) {
      color = "gray-200";
    } else if (["none", "transparent", "white"].includes(this.color)) {
      color = "gray-800";
    } else {
      const bright = ["100", "200", "300", "400"].includes(this.shade);
      color = bright ? this.color + "-800" : this.color + "-200";
    }
    return `
    <div class="absolute left-0 top-0 w-full h-full flex items-center justify-center">
      <div class="bg-${color} h-3 w-3 rounded-full"></div>
    </div>
    `;
  }

  renderExtra() {
    if (this.color == "none") return this.renderNone();
    if (this.color == "current") return this.renderCurrent();
    return "";
  }

  renderNone() {
    return `
    <div class="fill-current text-gray-400 h-full flex items-center justify-center">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
      <line x1="24" y1="0" x2="0" y2="24"></line>
      <line x1="0" y1="0" x2="24" y2="24"></line>
      </svg>
    </div>
    `;
  }

  renderCurrent() {
    return `
      <div class="absolute top-0 left-0 flex items-center justify-center w-full h-full text-sm text-gray-400">C</div>
    `;
  }

  /*** CLASSES */
  classes() {
    return [
      "h-full rounded relative select-none",
      this.classColor(),
      this.classBorder(),
      this.classTransparent(),
    ].join(" ");
  }

  classColor() {
    const blacklist = ["none", "transparent", "current", "black", "white"];

    if (!blacklist.includes(this.color)) {
      return `bg-${this.color}-${this.shade}`;
    } else if (this.color == "none") {
      return `bg-white`;
    } else {
      return `bg-${this.color}`;
    }
  }

  classBorder() {
    const whitelist = ["none", "transparent", "black", "white"];
    const weak = ["100", "200"];

    if (whitelist.includes(this.color)) {
      return "border border-gray-400";
    } else if (weak.includes(this.shade)) {
      return `border border-${this.color}-300`;
    }
    return "";
  }

  classTransparent() {
    return this.color == "transparent" ? "chess" : "";
  }

  /*** CALLBACKS */
  attributeChangedCallback(name, oldval, newval) {
    this.innerHTML = this.renderRoot();
  }

  connectedCallback() {
    this.innerHTML = this.renderRoot();
  }
}

customElements.define("palette-color", PaletteColor);
