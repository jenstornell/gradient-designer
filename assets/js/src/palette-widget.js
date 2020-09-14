class PaletteWidget extends HTMLElement {
  constructor() {
    super();

    this.eventClick = this.eventClick.bind(this);
  }

  static get observedAttributes() {
    return ["color", "shade", "title"];
  }

  get title() {
    return this.getAttribute("title");
  }

  get color() {
    return this.getAttribute("color");
  }

  get shade() {
    return this.getAttribute("shade");
  }

  renderRoot() {
    return `
    <div data-palette-widget class="flex flex-col gap-2 bg-white shadow-sm py-4">
      ${this.renderColors()}
      ${this.renderShades()}
    </div>
    `;
  }

  renderColors() {
    return `
    <div class="flex px-4 gap-4">
        <div class="flex flex-col gap-3">
          <div class="flex items-center gap-1">
            <div class="text-sm font-bold leading-none uppercase">Color:</div>
            <div class="text-sm text-gray-500 uppercase leading-none">${this.color}</div>
          </div>
          <palette-colors color="${this.color}"></palette-colors>
        </div>
        `;
  }

  renderShades() {
    var visibility = "";
    if (
      ["none", "transparent", "current", "black", "white"].includes(this.color)
    ) {
      visibility = "hidden";
    }
    return `
      <div class="flex flex-col gap-3 ${visibility}">
        <div class="flex items-center gap-1">
          <div class="text-sm font-bold leading-none uppercase">Shade:</div>
          <div class="text-sm text-gray-500 uppercase leading-none">${this.shade}</div>
        </div>
        <palette-shades color="${this.color}"></palette-shades>
      </div>
    `;
  }

  onClick() {
    this.querySelectorAll("[data-palette-widget] div>*").forEach((group) => {
      group.querySelectorAll("palette-color").forEach((item) => {
        item.addEventListener("click", this.eventClick, false);
        item.group = group;
      });
    });
  }

  eventClick(e) {
    const group = e.currentTarget.group;
    let color = group.querySelector('palette-color[active="true"]');

    color = this.activate(e, color);
    this.switchShade(color);
    this.outClass(e, color);
    this.toPreview();
    this.toTab();
  }

  activate(e, color) {
    if (color) {
      color.removeAttribute("active");
    }
    e.currentTarget.setAttribute("active", "true");

    return e.currentTarget.getAttribute("color");
  }

  switchShade(color) {
    this.querySelector("palette-shades").setAttribute("color", color);
  }

  outClass(e, color) {
    const blacklist = ["none", "transparent", "current", "black", "white"];
    let shade = null;
    let shadeOut = "";

    if (!blacklist.includes(color)) {
      const el = this.querySelector('palette-shades [active="true"]');
      shade = el.getAttribute("shade");
      shadeOut = shade ? "-" + shade : "";
    }

    const className = color + shadeOut;
    store[store.state][store.step] = {
      color: color,
      shade: shade,
      class: className,
    };
  }

  toPreview() {
    const className = store[store.state][store.step].class;
    document.querySelector("preview-gradient").setAttribute("from", className);
  }

  toTab() {
    document
      .querySelector('palette-tab-item[active="true"]')
      .setAttribute("color", store[store.state][store.step].color);
    document
      .querySelector('palette-tab-item[active="true"]')
      .setAttribute("shade", store[store.state][store.step].shade);
  }

  /*  

          store[store.state][store.step] = `bg-${activeColor}-${activeShade}`;
   
          */

  /*store[store.state][store.step] = {
            color: e.currentTarget.color,
            shade: current.shade,
          };*/

  /*** CALLBACKS */
  attributeChangedCallback(name, oldval, newval) {
    this.innerHTML = this.renderRoot();
    this.onClick();
  }

  connectedCallback() {
    this.innerHTML = this.renderRoot();
    this.onClick();
  }
}

customElements.define("palette-widget", PaletteWidget);
