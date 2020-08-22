class SidebarSection extends HTMLElement {
  static get observedAttributes() {
    return ["title", "subtitle", "bg", "border"];
  }
  constructor() {
    super();

    this.title = this.getAttribute("title");
    this.subtitle = this.getAttribute("subtitle");
    this.bg = this.getAttribute("bg");
    this.border = this.getAttribute("border");

    this.innerHTML = this.template();
  }

  template() {
    return `
    <section class="flex justify-between gap-4 px-4 py-3 bg-gray-100 border-b">
      <div class="flex flex-col gap-1">
        <div data-title class="text-sm font-bold leading-none uppercase">${this.title}</div>
        <div data-subtitle class="text-xs leading-none text-gray-500">${this.subtitle}</div>
      </div>
      <palette-color color="${this.bg}"></palette-color>
    </section>
    `;
  }

  connectedCallback() {
    //  this.setAttribute("subtitle", "jaaa");
    //this.setAttribute("title", "jaaa");
    //this.setAttribute("bg", "red");
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this[name] = newValue;
    //this.innerHTML = this.template();
  }

  set title(value) {
    this.titleValue = value;
  }

  set subtitle(value) {
    this.subtitleValue = value;
  }

  set bg(value) {
    this.bgValue = value;
  }

  set border(value) {
    this.borderValue = value;
  }

  get title() {
    return this.titleValue;
  }

  get subtitle() {
    return this.subtitleValue;
  }

  get bg() {
    return this.bgValue;
  }

  get border() {
    return this.borderValue;
  }
}

customElements.define("sidebar-section", SidebarSection);
