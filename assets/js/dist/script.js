const store_actions = {
  // Update preview colors
  updatePreviewColors() {
    document.querySelectorAll("preview-colors").forEach((el) => {
      el.attributeChangedCallback();
    });
  },

  // Activate gradient
  activateGradient(name) {
    document
      .querySelector(`gradient-square[active="true"]`)
      .removeAttribute("active");
    document
      .querySelector(`gradient-square[name="${name}"]`)
      .setAttribute("active", "true");
  },
  render(selector) {
    document.querySelectorAll(selector).forEach((el) => {
      el.connectedCallback();
    });
  },
  activateFirstGradient() {
    document.querySelector(`gradient-square`).setAttribute("active", "true");
  },
  selectText(el) {
    const range = document.createRange();
    range.selectNode(el);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
  },
};

const store_getters = {
  custom() {
    return store.state.gradients.custom;
  },
  heroes() {
    return store.state.gradients.heroes;
  },
  buttons() {
    return store.state.gradients.buttons;
  },
  misc() {
    return store.state.gradients.misc;
  },
  gradient(group, name) {
    return store.state.gradients[group][name];
  },
  currentGradient() {
    const current = store.state.current;
    return store.state.gradients[current.group][current.gradient];
  },
  currentStep() {
    const current = store.state.current;
    return store.getters.currentGradient().classes[current.step];
  },
  currentDirection() {
    return store.getters.currentGradient().direction;
  },
  currentColor() {
    const current = store.state.current;
    return store.getters.currentGradient().classes[current.step].color;
  },
  currentShade() {
    const current = store.state.current;
    return store.getters.currentGradient().classes[current.step].shade;
  },
  currentToClasses() {
    const obj = store.getters.currentGradient().classes;
    let html = "";

    for (const key in obj) {
      const item = obj[key];

      if (store.state.settings.allowedColors.includes(item.color)) {
        html += `${key}-${item.color}`;
        let shade = " ";
        const allowed_shade = store.state.settings.hasShades.includes(
          item.color
        );

        if (allowed_shade && item.shade) {
          shade = `-${item.shade} `;
        }
        html += shade;
      }
    }

    html += `bg-gradient-to-${store.getters.currentGradient().direction}`;
    return html;
  },
};

var store_presets = {
  custom: {},
  heroes: {
    heroBright: {
      title: "Hero - Bright",
      direction: "tl",
      classes: {
        from: {
          color: "gray",
          shade: "400",
        },
        to: {
          color: "gray",
          shade: "100",
        },
      },
    },
    heroDark: {
      title: "Hero - Dark",
      direction: "tl",
      classes: {
        from: {
          color: "gray",
          shade: "900",
        },
        to: {
          color: "gray",
          shade: "500",
        },
      },
    },
    heroPurple: {
      title: "Hero - Purple",
      direction: "tl",
      classes: {
        from: {
          color: "purple",
          shade: "600",
        },
        to: {
          color: "purple",
          shade: "300",
        },
      },
    },
    heroNature: {
      title: "Hero - Nature",
      direction: "tl",
      classes: {
        from: {
          color: "teal",
          shade: "700",
        },
        to: {
          color: "green",
          shade: "300",
        },
      },
    },
    heroSky: {
      title: "Hero - Sky",
      direction: "tl",
      classes: {
        from: {
          color: "blue",
          shade: "700",
        },
        to: {
          color: "indigo",
          shade: "300",
        },
      },
    },
    heroPinky: {
      title: "Hero - Pinky",
      direction: "tl",
      classes: {
        from: {
          color: "pink",
          shade: "700",
        },
        to: {
          color: "red",
          shade: "300",
        },
      },
    },
  },
  buttons: {
    buttonBright: {
      title: "Button - Bright",
      direction: "t",
      classes: {
        from: {
          color: "gray",
          shade: "400",
        },
        via: {
          color: "gray",
          shade: "400",
        },
        to: {
          color: "gray",
          shade: "300",
        },
      },
    },
    buttonDark: {
      title: "Button - Dark",
      direction: "t",
      classes: {
        from: {
          color: "gray",
          shade: "700",
        },
        via: {
          color: "gray",
          shade: "700",
        },
        to: {
          color: "gray",
          shade: "600",
        },
      },
    },
  },
  misc: {
    equalizer: {
      title: "Equalizer",
      direction: "t",
      classes: {
        from: {
          color: "red",
          shade: "500",
        },
        via: {
          color: "yellow",
          shade: "500",
        },
        to: {
          color: "green",
          shade: "500",
        },
      },
    },
  },
};

const store_setters = {
  count(value) {
    store.state.count = value;
  },
  default(obj) {
    store.state.gradients.custom.default = obj;
  },
  title(title) {
    store.getters.currentGradient().title = title;
    console.log(store.state);
    store.actions.render('gradient-squares[group="custom"]');
  },
  current(el) {},
  addGradient() {
    const gradient = store.getters.currentGradient();
    const unique = `gradient_${Date.now()}`;

    store.state.gradients.custom[unique] = gradient;
    store.actions.render('gradient-squares[group="custom"]');
    store.actions.activateGradient(unique);
    store.actions.render("pane-export");
  },
  currentAll(current_obj) {
    store.state.current = current_obj;
  },
  currentGradient(group, gradient) {
    store.state.current.gradient = gradient;
    store.state.current.group = group;

    store.actions.render("preview-gradient, preview-colors");
  },
  tab(tab) {
    store.state.current.tab = tab;
    store.actions.render("palette-tabs");
    store.actions.render("pane-export");
    store.actions.render("colors-pane");
    store.actions.render("pane-about");
    store.actions.render("pane-direction");
    store.actions.render("pane-import");
    store.actions.render("pane-profile");

    Prism.highlightAll();

    // Set active to preview color
    document.querySelectorAll(`palette-color`).forEach((el) => {
      if (el.getAttribute("step") == tab) {
        el.setAttribute("active", "true");
      } else {
        el.removeAttribute("active");
      }
    });
  },
  custom(data) {
    store.state.gradients.custom = JSON.parse(data);
    const first_key = Object.keys(store.state.gradients.custom)[0];
    store.setters.currentGradient("custom", first_key);
    store.actions.render("gradient-squares");
    store.actions.activateFirstGradient();
  },
  customAdd(data) {
    store.state.gradients.custom = Object.assign(
      store.state.gradients.custom,
      JSON.parse(data)
    );
    const first_key = Object.keys(store.state.gradients.custom)[0];
    store.setters.currentGradient("custom", first_key);
    store.actions.render("gradient-squares");
    store.actions.activateFirstGradient();
  },
  color(color) {
    store.getters.currentStep().color = color;

    store.actions.updatePreviewColors();
    store.actions.updatePreviewGradients();
  },
  direction(direction) {
    store.getters.currentGradient().direction = direction;
    store.actions.render("preview-gradient");
    store.actions.render("gradient-squares");
  },
};

const store_settings = {
  hasShades: [
    "gray",
    "red",
    "yellow",
    "orange",
    "green",
    "teal",
    "blue",
    "indigo",
    "purple",
    "pink",
  ],
  allowedColors: [
    "transparent",
    "current",
    "black",
    "white",
    "gray",
    "red",
    "yellow",
    "orange",
    "green",
    "teal",
    "blue",
    "indigo",
    "purple",
    "pink",
  ],
  isTransparent: ["transparent"],
  default: {
    title: "Hero - Bright",
    direction: "tl",
    classes: {
      from: {
        color: "gray",
        shade: "400",
      },
      to: {
        color: "gray",
        shade: "100",
      },
    },
  },
};

const store = {
  state: {
    settings: store_settings,
    gradients: store_presets,
  },
  setters: store_setters,
  getters: store_getters,
  actions: store_actions,
};

if (typeof localStorage.twgd == "undefined") {
  store.setters.default(store.state.settings.default);
  store.setters.currentAll({
    gradient: "default",
    group: "custom",
    tab: "from",
    prefix: "",
  });
}

console.log("STORE");

String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};




class ColorsPane extends HTMLElement {
  constructor() {
    super();
  }

  renderRoot() {
    return `
    <div class="flex gap-4 ${this.allowed() ? "" : "hidden"}">
      <div class="flex flex-col gap-2">
        <div class="text-sm font-bold uppercase">Color: <span data-color
            class="font-normal text-gray-500">red</span>
        </div>
        <palette-colors color="red"></palette-colors>
      </div>

      <div class="flex flex-col gap-2">
        <div class="text-sm font-bold uppercase">Shade: <span data-color
            class="font-normal text-gray-500">red</span>
        </div>
        <palette-shades color="red"></palette-shades>
      </div>
    </div>
    `;
  }

  allowed() {
    return ["from", "via", "to"].includes(store.state.current.tab);
  }

  connectedCallback() {
    this.innerHTML = this.renderRoot();
  }
}

customElements.define("colors-pane", ColorsPane);

class DirectionTabItem extends HTMLElement {
  constructor() {
    super();
  }

  get title() {
    return this.getAttribute("title");
  }

  renderRoot() {
    return `
    <div class="flex relative rounded-t ${this.activeClasses()} px-4 py-2">
        ${this.backdrop()}
        <div class="relative gap-2 flex items-center">
          
          ${this.title}
        </div>
      </div>`;
  }

  backdrop() {
    if (this.active) {
      return `<div class="absolute bg-white h-full w-full left-0 mt-1 top-0"></div>`;
    }
    return "";
  }

  activeClasses() {
    return this.active ? "border-gray-400 border-r border-l border-t" : "";
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.innerHTML = this.renderRoot();
  }

  connectedCallback() {
    this.innerHTML = this.renderRoot();
  }
}

customElements.define("direction-tab-item", DirectionTabItem);

class GradientAdd extends HTMLElement {
  constructor() {
    super();
  }

  renderRoot() {
    return `
    <div class="flex items-center justify-center w-16 h-16 -mt-1 bg-gray-200 border rounded fill-current">
          <svg class="w-6 h-6 text-gray-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24"
            height="24">
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z" /></svg>
      </div>
    `;
  }

  connectedCallback() {
    this.innerHTML = this.renderRoot();
    this.onClick();
  }

  onClick() {
    this.addEventListener("click", (e) => {
      store.setters.addGradient();
    });
  }
}

customElements.define("gradient-add", GradientAdd);

class GradientSquare extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["gradient", "active"];
  }

  get active() {
    if (!this.getAttribute("active")) return false;
    if (this.getAttribute("active") == "false") return false;
    return true;
  }

  get name() {
    return this.getAttribute("name");
  }

  get group() {
    return this.getAttribute("group");
  }

  classes() {
    const collection = this.data().classes;
    let html = "";

    for (const key in collection) {
      const data = collection[key];
      const class_html = key + this.toClass(data);

      html += " " + class_html;
    }
    return html;
  }

  toClass(obj) {
    let html = "";
    if (!this.isEmpty(obj["color"])) {
      html += `-${obj["color"]}`;
    }
    if (!this.isEmpty(obj["shade"])) {
      html += `-${obj["shade"]}`;
    }
    return html;
  }

  isEmpty(obj) {
    return Object.keys(obj).length === 0;
  }

  data() {
    return store.state.gradients[this.group][this.name];
  }

  renderRoot() {
    return `
    <div class="bg-gradient-to-${
      this.data().direction
    } flex items-center justify-center w-16 h-16 ${this.classes()} rounded" title="${
      this.data().title
    }">
      ${this.renderActive()}
    </div>
    `;
  }

  renderActive() {
    if (!this.active) return "";
    return `
    <div class="w-5 h-5 bg-white rounded-full shadow" style="box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 1px 2px 0 rgba(0, 0, 0, .5);"></div>
    `;
  }

  attributeChangedCallback(name) {
    this.innerHTML = this.renderRoot();
    if (name == "active" && this.active) {
      store.setters.current(this);
    }
  }

  connectedCallback() {
    this.innerHTML = this.renderRoot();
    this.onClick();
  }

  onClick() {
    this.addEventListener("click", (e) => {
      const el = e.currentTarget;

      document.querySelectorAll("gradient-square").forEach((item) => {
        item.removeAttribute("active");
      });

      el.setAttribute("active", "true");

      store.setters.currentGradient(this.group, this.name);
    });
  }
}

customElements.define("gradient-square", GradientSquare);

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

class PaletteColors extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["color"];
  }

  get color() {
    return this.getAttribute("color");
  }

  renderRoot() {
    let html = "";
    const colors = [
      "none",
      "transparent",
      "current",
      "black",
      "white",
      "gray",
      "red",
      "yellow",
      "orange",
      "green",
      "teal",
      "blue",
      "indigo",
      "purple",
      "pink",
    ];
    colors.forEach((color) => {
      html += `<palette-color color="${color}"></palette-color>`;
    });
    return `<div class="inline-grid gap-1" style="grid-auto-rows: 32px; grid-template-columns: repeat(5, 32px);">${html}</div>`;
  }

  attributeChangedCallback() {
    this.innerHTML = this.renderRoot();
    this.onClick();
  }

  connectedCallback() {
    this.innerHTML = this.renderRoot();
    this.onClick();
  }

  onClick() {
    this.querySelectorAll("palette-color").forEach((el) => {
      el.addEventListener("click", (e) => {
        const color = e.currentTarget.getAttribute("color");

        store.setters.color(color);
      });
    });
  }
}

customElements.define("palette-colors", PaletteColors);

class PaletteShades extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["color"];
  }

  get color() {
    return this.getAttribute("color");
  }

  renderRoot() {
    let html = "";
    const shades = [
      "100",
      "200",
      "300",
      "400",
      "500",
      "600",
      "700",
      "800",
      "900",
    ];
    shades.forEach((shade) => {
      html += `
        <palette-color color="${this.color}" shade="${shade}"></palette-color>
      `;
    });
    return `
      <div class="inline-grid gap-1" style="grid-auto-rows: 32px; grid-template-columns: repeat(5, 32px);">
        ${html}
      </div>
    `;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.querySelectorAll("palette-color").forEach((item) => {
      item.setAttribute("color", newValue);
    });
  }

  connectedCallback() {
    this.innerHTML = this.renderRoot();
    this.querySelector('[shade="500"]').setAttribute("active", "true");
  }
}

customElements.define("palette-shades", PaletteShades);

class PaletteTabItem extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["tab"];
  }

  get tab() {
    return this.getAttribute("tab");
  }

  renderRoot() {
    return `
      <div class="flex relative rounded-t ${this.activeClasses()} px-3 py-2">
        <div class="relative gap-2 flex items-center">
          ${this.tab.capitalize()}
        </div>
      </div>`;
  }

  activeClasses() {
    const currentTab = store.state.current.tab;
    return this.tab == currentTab ? "bg-white border-gray-400 topshadow" : "";
  }

  attributeChangedCallback() {
    this.innerHTML = this.renderRoot();
  }

  connectedCallback() {
    this.innerHTML = this.renderRoot();
  }
}

customElements.define("palette-tab-item", PaletteTabItem);

class PaletteTabs extends HTMLElement {
  constructor() {
    super();
  }

  renderRoot() {
    return `
    <div class="select-none cursor-default px-4 pt-3 bg-gray-300">
      <div class="flex">   
        <palette-tab-item tab="from"></palette-tab-item>
        <palette-tab-item tab="via"></palette-tab-item>
        <palette-tab-item tab="to"></palette-tab-item>
        <palette-tab-item tab="direction"></palette-tab-item>
        <palette-tab-item tab="profile"></palette-tab-item>
        <palette-tab-item tab="code" class="ml-auto"></palette-tab-item>
        <palette-tab-item tab="export"></palette-tab-item>
        <palette-tab-item tab="import"></palette-tab-item>
        <palette-tab-item tab="about"></palette-tab-item>
      </div>
    </div>
    `;
  }

  connectedCallback() {
    this.innerHTML = this.renderRoot();
    this.onClick();
  }

  onClick() {
    this.querySelectorAll("palette-tab-item").forEach((item) => {
      item.addEventListener("click", this.handleClick.bind(this), false);
    });
  }

  handleClick(e) {
    store.setters.tab(e.currentTarget.getAttribute("tab"));
  }
}

customElements.define("palette-tabs", PaletteTabs);

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

class PaneAbout extends HTMLElement {
  constructor() {
    super();
  }

  renderRoot() {
    return `
    <div class="flex flex-col gap-2 ${this.allowed() ? "" : "hidden"}">
      <h2 class="text-xl font-bold">Gradient Designer</h2>
      <p>Built with
      <a href="https://tailwindcss.com/" target="_blank" class="underline">Tailwind CSS</a>
      and <a class="underline" href="https://remixicon.com/" target="_blank">RemixIcon</a>.</p>

      <div class="flex mt-2 gap-2 items-center">
        <a href="https://www.paypal.me/devoneraab" class="flex items-center" target="_blank">
          <div class="inline-block p-1 bg-gray-300 rounded border">
            <img class="h-6" src="assets/images/paypal.svg">
          </div>
        </a>
            
        <a href="https://github.com/jenstornell/tailwind-gradient-designer" target="_blank">
          <svg class="inline-block w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <path fill="none" d="M0 0h24v24H0z"></path>
          <path d="M12 2C6.475 2 2 6.475 2 12a9.994 9.994 0 0 0 6.838 9.488c.5.087.687-.213.687-.476 0-.237-.013-1.024-.013-1.862-2.512.463-3.162-.612-3.362-1.175-.113-.288-.6-1.175-1.025-1.413-.35-.187-.85-.65-.013-.662.788-.013 1.35.725 1.538 1.025.9 1.512 2.338 1.087 2.912.825.088-.65.35-1.087.638-1.337-2.225-.25-4.55-1.113-4.55-4.938 0-1.088.387-1.987 1.025-2.688-.1-.25-.45-1.275.1-2.65 0 0 .837-.262 2.75 1.026a9.28 9.28 0 0 1 2.5-.338c.85 0 1.7.112 2.5.337 1.912-1.3 2.75-1.024 2.75-1.024.55 1.375.2 2.4.1 2.65.637.7 1.025 1.587 1.025 2.687 0 3.838-2.337 4.688-4.562 4.938.362.312.675.912.675 1.85 0 1.337-.013 2.412-.013 2.75 0 .262.188.574.688.474A10.016 10.016 0 0 0 22 12c0-5.525-4.475-10-10-10z"></path>
          </svg>
        </a>
      </div>
    </div>
    `;
  }

  allowed() {
    return ["about"].includes(store.state.current.tab);
  }

  connectedCallback() {
    this.innerHTML = this.renderRoot();
  }
}

customElements.define("pane-about", PaneAbout);

class PaneDirection extends HTMLElement {
  constructor() {
    super();
  }

  renderRoot() {
    return `
    <div class="flex flex-col gap-2 ${this.allowed() ? "" : "hidden"}">
      <div class="text-sm font-bold uppercase">
        Direction:
        <span data-direction class="font-normal text-gray-500">${store.getters.currentDirection()}</span>
      </div>
      <div class="grid grid-flow-row text-gray-500 fill-current"
      style="grid-template-columns: repeat(3, minmax(0, min-content));">
      <button data-class="tl"
        class="w-6 border border-transparent rounded hover:border-gray-500 focus:outline-none">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <path fill="none" d="M0 0h24v24H0z"></path>
          <path d="M9.414 8l8.607 8.607-1.414 1.414L8 9.414V17H6V6h11v2z"></path>
        </svg>
      </button>
      <button data-class="t"
        class="w-6 border border-transparent rounded hover:border-gray-500 focus:outline-none">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <path fill="none" d="M0 0h24v24H0z"></path>
          <path d="M13 7.828V20h-2V7.828l-5.364 5.364-1.414-1.414L12 4l7.778 7.778-1.414 1.414L13 7.828z"></path>
        </svg>
      </button>
      <button data-class="tr"
        class="w-6 border border-transparent rounded hover:border-gray-500 focus:outline-none">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <path fill="none" d="M0 0h24v24H0z"></path>
          <path d="M16.004 9.414l-8.607 8.607-1.414-1.414L14.589 8H7.004V6h11v11h-2V9.414z"></path>
        </svg>
      </button>
      <button data-class="l"
        class="w-6 border border-transparent rounded hover:border-gray-500 focus:outline-none">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <path fill="none" d="M0 0h24v24H0z"></path>
          <path d="M7.828 11H20v2H7.828l5.364 5.364-1.414 1.414L4 12l7.778-7.778 1.414 1.414z"></path>
        </svg>
      </button>
      <div></div>
      <button data-class="r"
        class="text-gray-800 bg-gray-300 border border-transparent rounded focus:outline-none">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <path fill="none" d="M0 0h24v24H0z"></path>
          <path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"></path>
        </svg>
      </button>
      <button data-class="bl"
        class="w-6 border border-transparent rounded hover:border-gray-500 focus:outline-none">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <path fill="none" d="M0 0h24v24H0z"></path>
          <path d="M9 13.59l8.607-8.607 1.414 1.414-8.607 8.607H18v2H7v-11h2v7.585z"></path>
        </svg>
      </button>
      <button data-class="b"
        class="w-6 border border-transparent rounded hover:border-gray-500 focus:outline-none">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <path fill="none" d="M0 0h24v24H0z"></path>
          <path d="M13 16.172l5.364-5.364 1.414 1.414L12 20l-7.778-7.778 1.414-1.414L11 16.172V4h2v12.172z">
          </path>
        </svg>
      </button>
      <button data-class="br"
        class="w-6 border border-transparent rounded hover:border-gray-500 focus:outline-none">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <path fill="none" d="M0 0h24v24H0z"></path>
          <path d="M14.59 16.004L5.982 7.397l1.414-1.414 8.607 8.606V7.004h2v11h-11v-2z"></path>
        </svg>
      </button>
    </div>
    </div>
    `;
  }

  allowed() {
    return ["direction"].includes(store.state.current.tab);
  }

  connectedCallback() {
    this.innerHTML = this.renderRoot();
    this.onClick();
  }

  onClick() {
    this.querySelectorAll("button").forEach((item) => {
      item.addEventListener("click", (e) => {
        const el = e.currentTarget;
        const direction = el.dataset.class;

        store.setters.direction(direction);

        this.querySelectorAll("button").forEach((item) => {
          item.classList.remove("bg-gray-300", "text-gray-800");
          item.classList.add("text-gray-500");
        });

        el.classList.add("bg-gray-300", "text-gray-800");
        el.classList.remove("text-gray-500");

        this.querySelector("[data-direction]").innerHTML = direction;
      });
    });
  }
}

customElements.define("pane-direction", PaneDirection);

class PaneExport extends HTMLElement {
  constructor() {
    super();
  }

  renderRoot() {
    return `
      <div class="${
        store.state.current.tab == "export" ? "" : "hidden"
      } gap-2 flex flex-col w-full">
      <div class="font-bold text-sm uppercase">Export</div>
      <textarea spellcheck="false" class="border cursor-auto resize-none h-32 focus:outline-none bg-gray-200 text-sm font-mono">${JSON.stringify(
        store.state.gradients.custom
      )}</textarea>
        <div class="flex justify-end">
          <button class="from-gray-300 via-gray-300 to-gray-200 bg-gradient-to-t cursor-default focus:outline-none border border-gray-400 text-xs hover:border-gray-500 font-bold uppercase text-gray-800 rounded-full px-3 py-1">Select all</button>
        </div>
      </div>
    `;
  }

  activeClasses() {
    const currentTab = store.state.current.tab;
    return this.tab == currentTab ? "bg-white border-gray-400 topshadow" : "";
  }

  connectedCallback() {
    this.innerHTML = this.renderRoot();
    this.onClick();
  }

  onClick() {
    this.querySelector("button").addEventListener("click", () => {
      store.actions.selectText(document.querySelector("pane-export textarea"));
    });
  }
}

customElements.define("pane-export", PaneExport);

class PaneImport extends HTMLElement {
  constructor() {
    super();
  }

  renderRoot() {
    return `
      <div class="${
        store.state.current.tab == "import" ? "" : "hidden"
      } gap-2 flex flex-col w-full">
      <div class="font-bold text-sm uppercase">Import</div>
      <textarea spellcheck="false" class="border cursor-auto resize-none h-32 focus:outline-none bg-gray-200 text-sm font-mono">{"default":{"title":"Hero - Bright","direction":"tl","classes":{"from":{"color":"gray","shade":"400"},"to":{"color":"red","shade":"500"}}}}
      </textarea>
        <div class="flex justify-end gap-2">
          <button data-add class="from-gray-300 via-gray-300 to-gray-200 bg-gradient-to-t cursor-default focus:outline-none border border-gray-400 text-xs hover:border-gray-500 font-bold uppercase text-gray-800 rounded-full px-3 py-1">Add</button>
          <button data-replace class="from-gray-300 via-gray-300 to-gray-200 bg-gradient-to-t cursor-default focus:outline-none border border-gray-400 text-xs hover:border-gray-500 font-bold uppercase text-gray-800 rounded-full px-3 py-1">Replace</button>
        </div>
      </div>
    `;
  }

  /*  activeClasses() {
    const currentTab = store.state.current.tab;
    return this.tab == currentTab ? "bg-white border-gray-400 topshadow" : "";
  }*/

  connectedCallback() {
    this.innerHTML = this.renderRoot();
    this.onReplace();
    this.onAdd();
  }

  onReplace() {
    this.querySelector("[data-replace]").addEventListener("click", () => {
      const value = this.querySelector("textarea").value;
      store.setters.custom(value);
    });
  }

  onAdd() {
    this.querySelector("[data-add]").addEventListener("click", () => {
      const value = this.querySelector("textarea").value;
      store.setters.customAdd(value);
    });
  }
}

customElements.define("pane-import", PaneImport);

class PaneProfile extends HTMLElement {
  constructor() {
    super();
  }

  renderRoot() {
    return `
    <div class="flex gap-4 ${
      store.state.current.tab == "profile" ? "" : "hidden"
    }">
      <div class="flex flex-col gap-2">
        <label class="text-sm font-bold uppercase flex flex-col gap-2">
          Gradient title
          <input data-title type="text" class="shadow-inner bg-gray-300 focus:outline-none p-2" spellcheck="false" autocomplete="off" style="max-width: 300px;">
        </label>
      </div>
      <div class="flex flex-col gap-2">
        <label class="text-sm font-bold uppercase flex flex-col gap-2">
          Tailwind class prefix
          <input data-prefix type="text" class="shadow-inner bg-gray-300 focus:outline-none p-2" spellcheck="false" autocomplete="off" style="max-width: 300px;">
        </label>
      </div>
      <div class="flex flex-col gap-2">
        <label class="text-sm font-bold uppercase flex flex-col gap-2">
         Delete gradient
          <button data-delete class="border border-red-500 hover:border-red-800 from-red-700 via-red-700 to-red-500 bg-gradient-to-t text-white rounded focus:outline-none px-4 py-2">Delete current</button>
        </label>
      </div>
      <div class="flex flex-col gap-2">
        <label class="text-sm font-bold uppercase flex flex-col gap-2">
         &nbsp;
          <button data-delete-all class="border border-red-500 hover:border-red-800 from-red-700 via-red-700 to-red-500 bg-gradient-to-t text-white rounded focus:outline-none px-4 py-2">Delete all</button>
        </label>
      </div>
    </div>
    `;
  }

  connectedCallback() {
    this.innerHTML = this.renderRoot();
    //this.onClick();
    this.onDelete();
    this.onDeleteAll();
    this.onTitle();
    this.onPrefix();
  }

  onDelete() {
    this.querySelector("[data-delete]").addEventListener("click", () => {
      console.log("del");
      if (!confirm("Delete this gradient?")) return;

      const current = store.state.current;
      delete store.state.gradients[current.group][current.gradient];

      // If no gradients add the default one
      if (this.isEmpty(store.state.gradients[current.group])) {
        store.setters.default(store.state.settings.default);
        store.setters.currentAll({
          gradient: "default",
          group: "custom",
          tab: "from",
          prefix: "",
        });
        store.actions.render('gradient-squares[group="custom"]');
        document
          .querySelector("gradient-square")
          .setAttribute("active", "true");
      }
    });
  }

  onDeleteAll() {
    this.querySelector("[data-delete-all]").addEventListener("click", () => {
      console.log("del all");
      if (!confirm("Delete all custom gradients?")) return;

      store.state.gradients["custom"] = {};

      // Add the default one
      store.setters.default(store.state.settings.default);
      store.setters.currentAll({
        gradient: "default",
        group: "custom",
        tab: "from",
        prefix: "",
      });
      store.actions.render('gradient-squares[group="custom"]');
      document.querySelector("gradient-square").setAttribute("active", "true");
    });
  }

  onTitle() {
    this.querySelector("[data-title]").addEventListener("keyup", (e) => {
      store.setters.title(e.currentTarget.value);
    });
  }

  onPrefix() {
    this.querySelector("[data-prefix]").addEventListener("keyup", (e) => {
      store.state.current.prefix = e.currentTarget.value;
    });
  }

  isEmpty(obj) {
    return Object.keys(obj).length === 0;
  }

  /*
  onClick() {
    this.querySelectorAll("palette-tab-item").forEach((item) => {
      item.addEventListener("click", this.handleClick.bind(this), false);
    });
  }

  handleClick(e) {
    store.setters.tab(e.currentTarget.getAttribute("tab"));
  }*/
}

customElements.define("pane-profile", PaneProfile);

class PreviewColors extends HTMLElement {
  constructor() {
    super();
  }

  renderRoot() {
    return `
    <div class="flex gap-1">
        ${this.items()}
    </div>
    `;
  }

  items() {
    let html = "";

    const obj = store.getters.currentGradient().classes;

    for (const key in obj) {
      const item = obj[key];
      html += `<palette-color
      ${this.active(key)}
      step="${key}"
      class="w-10 h-10"
      color="${item.color}"
      shade="${item.shade}"></palette-color>`;
    }

    return html;
  }

  active(key) {
    return key == store.state.current.tab ? ` active="true"` : "";
  }

  connectedCallback() {
    this.innerHTML = this.renderRoot();
    this.onClick();
  }

  onClick() {
    this.querySelectorAll("palette-color").forEach((item) => {
      item.addEventListener("click", (e) => {
        store.setters.tab(e.currentTarget.getAttribute("step"));
      });
    });
  }
}

customElements.define("preview-colors", PreviewColors);

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

/* PrismJS 1.21.0
https://prismjs.com/download.html#themes=prism&languages=markup */
var _self="undefined"!=typeof window?window:"undefined"!=typeof WorkerGlobalScope&&self instanceof WorkerGlobalScope?self:{},Prism=function(u){var c=/\blang(?:uage)?-([\w-]+)\b/i,n=0,M={manual:u.Prism&&u.Prism.manual,disableWorkerMessageHandler:u.Prism&&u.Prism.disableWorkerMessageHandler,util:{encode:function e(n){return n instanceof W?new W(n.type,e(n.content),n.alias):Array.isArray(n)?n.map(e):n.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\u00a0/g," ")},type:function(e){return Object.prototype.toString.call(e).slice(8,-1)},objId:function(e){return e.__id||Object.defineProperty(e,"__id",{value:++n}),e.__id},clone:function t(e,r){var a,n;switch(r=r||{},M.util.type(e)){case"Object":if(n=M.util.objId(e),r[n])return r[n];for(var i in a={},r[n]=a,e)e.hasOwnProperty(i)&&(a[i]=t(e[i],r));return a;case"Array":return n=M.util.objId(e),r[n]?r[n]:(a=[],r[n]=a,e.forEach(function(e,n){a[n]=t(e,r)}),a);default:return e}},getLanguage:function(e){for(;e&&!c.test(e.className);)e=e.parentElement;return e?(e.className.match(c)||[,"none"])[1].toLowerCase():"none"},currentScript:function(){if("undefined"==typeof document)return null;if("currentScript"in document)return document.currentScript;try{throw new Error}catch(e){var n=(/at [^(\r\n]*\((.*):.+:.+\)$/i.exec(e.stack)||[])[1];if(n){var t=document.getElementsByTagName("script");for(var r in t)if(t[r].src==n)return t[r]}return null}},isActive:function(e,n,t){for(var r="no-"+n;e;){var a=e.classList;if(a.contains(n))return!0;if(a.contains(r))return!1;e=e.parentElement}return!!t}},languages:{extend:function(e,n){var t=M.util.clone(M.languages[e]);for(var r in n)t[r]=n[r];return t},insertBefore:function(t,e,n,r){var a=(r=r||M.languages)[t],i={};for(var l in a)if(a.hasOwnProperty(l)){if(l==e)for(var o in n)n.hasOwnProperty(o)&&(i[o]=n[o]);n.hasOwnProperty(l)||(i[l]=a[l])}var s=r[t];return r[t]=i,M.languages.DFS(M.languages,function(e,n){n===s&&e!=t&&(this[e]=i)}),i},DFS:function e(n,t,r,a){a=a||{};var i=M.util.objId;for(var l in n)if(n.hasOwnProperty(l)){t.call(n,l,n[l],r||l);var o=n[l],s=M.util.type(o);"Object"!==s||a[i(o)]?"Array"!==s||a[i(o)]||(a[i(o)]=!0,e(o,t,l,a)):(a[i(o)]=!0,e(o,t,null,a))}}},plugins:{},highlightAll:function(e,n){M.highlightAllUnder(document,e,n)},highlightAllUnder:function(e,n,t){var r={callback:t,container:e,selector:'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'};M.hooks.run("before-highlightall",r),r.elements=Array.prototype.slice.apply(r.container.querySelectorAll(r.selector)),M.hooks.run("before-all-elements-highlight",r);for(var a,i=0;a=r.elements[i++];)M.highlightElement(a,!0===n,r.callback)},highlightElement:function(e,n,t){var r=M.util.getLanguage(e),a=M.languages[r];e.className=e.className.replace(c,"").replace(/\s+/g," ")+" language-"+r;var i=e.parentElement;i&&"pre"===i.nodeName.toLowerCase()&&(i.className=i.className.replace(c,"").replace(/\s+/g," ")+" language-"+r);var l={element:e,language:r,grammar:a,code:e.textContent};function o(e){l.highlightedCode=e,M.hooks.run("before-insert",l),l.element.innerHTML=l.highlightedCode,M.hooks.run("after-highlight",l),M.hooks.run("complete",l),t&&t.call(l.element)}if(M.hooks.run("before-sanity-check",l),!l.code)return M.hooks.run("complete",l),void(t&&t.call(l.element));if(M.hooks.run("before-highlight",l),l.grammar)if(n&&u.Worker){var s=new Worker(M.filename);s.onmessage=function(e){o(e.data)},s.postMessage(JSON.stringify({language:l.language,code:l.code,immediateClose:!0}))}else o(M.highlight(l.code,l.grammar,l.language));else o(M.util.encode(l.code))},highlight:function(e,n,t){var r={code:e,grammar:n,language:t};return M.hooks.run("before-tokenize",r),r.tokens=M.tokenize(r.code,r.grammar),M.hooks.run("after-tokenize",r),W.stringify(M.util.encode(r.tokens),r.language)},tokenize:function(e,n){var t=n.rest;if(t){for(var r in t)n[r]=t[r];delete n.rest}var a=new i;return I(a,a.head,e),function e(n,t,r,a,i,l){for(var o in r)if(r.hasOwnProperty(o)&&r[o]){var s=r[o];s=Array.isArray(s)?s:[s];for(var u=0;u<s.length;++u){if(l&&l.cause==o+","+u)return;var c=s[u],g=c.inside,f=!!c.lookbehind,h=!!c.greedy,d=0,v=c.alias;if(h&&!c.pattern.global){var p=c.pattern.toString().match(/[imsuy]*$/)[0];c.pattern=RegExp(c.pattern.source,p+"g")}for(var m=c.pattern||c,y=a.next,k=i;y!==t.tail&&!(l&&k>=l.reach);k+=y.value.length,y=y.next){var b=y.value;if(t.length>n.length)return;if(!(b instanceof W)){var x=1;if(h&&y!=t.tail.prev){m.lastIndex=k;var w=m.exec(n);if(!w)break;var A=w.index+(f&&w[1]?w[1].length:0),P=w.index+w[0].length,S=k;for(S+=y.value.length;S<=A;)y=y.next,S+=y.value.length;if(S-=y.value.length,k=S,y.value instanceof W)continue;for(var E=y;E!==t.tail&&(S<P||"string"==typeof E.value);E=E.next)x++,S+=E.value.length;x--,b=n.slice(k,S),w.index-=k}else{m.lastIndex=0;var w=m.exec(b)}if(w){f&&(d=w[1]?w[1].length:0);var A=w.index+d,O=w[0].slice(d),P=A+O.length,L=b.slice(0,A),N=b.slice(P),j=k+b.length;l&&j>l.reach&&(l.reach=j);var C=y.prev;L&&(C=I(t,C,L),k+=L.length),z(t,C,x);var _=new W(o,g?M.tokenize(O,g):O,v,O);y=I(t,C,_),N&&I(t,y,N),1<x&&e(n,t,r,y.prev,k,{cause:o+","+u,reach:j})}}}}}}(e,a,n,a.head,0),function(e){var n=[],t=e.head.next;for(;t!==e.tail;)n.push(t.value),t=t.next;return n}(a)},hooks:{all:{},add:function(e,n){var t=M.hooks.all;t[e]=t[e]||[],t[e].push(n)},run:function(e,n){var t=M.hooks.all[e];if(t&&t.length)for(var r,a=0;r=t[a++];)r(n)}},Token:W};function W(e,n,t,r){this.type=e,this.content=n,this.alias=t,this.length=0|(r||"").length}function i(){var e={value:null,prev:null,next:null},n={value:null,prev:e,next:null};e.next=n,this.head=e,this.tail=n,this.length=0}function I(e,n,t){var r=n.next,a={value:t,prev:n,next:r};return n.next=a,r.prev=a,e.length++,a}function z(e,n,t){for(var r=n.next,a=0;a<t&&r!==e.tail;a++)r=r.next;(n.next=r).prev=n,e.length-=a}if(u.Prism=M,W.stringify=function n(e,t){if("string"==typeof e)return e;if(Array.isArray(e)){var r="";return e.forEach(function(e){r+=n(e,t)}),r}var a={type:e.type,content:n(e.content,t),tag:"span",classes:["token",e.type],attributes:{},language:t},i=e.alias;i&&(Array.isArray(i)?Array.prototype.push.apply(a.classes,i):a.classes.push(i)),M.hooks.run("wrap",a);var l="";for(var o in a.attributes)l+=" "+o+'="'+(a.attributes[o]||"").replace(/"/g,"&quot;")+'"';return"<"+a.tag+' class="'+a.classes.join(" ")+'"'+l+">"+a.content+"</"+a.tag+">"},!u.document)return u.addEventListener&&(M.disableWorkerMessageHandler||u.addEventListener("message",function(e){var n=JSON.parse(e.data),t=n.language,r=n.code,a=n.immediateClose;u.postMessage(M.highlight(r,M.languages[t],t)),a&&u.close()},!1)),M;var e=M.util.currentScript();function t(){M.manual||M.highlightAll()}if(e&&(M.filename=e.src,e.hasAttribute("data-manual")&&(M.manual=!0)),!M.manual){var r=document.readyState;"loading"===r||"interactive"===r&&e&&e.defer?document.addEventListener("DOMContentLoaded",t):window.requestAnimationFrame?window.requestAnimationFrame(t):window.setTimeout(t,16)}return M}(_self);"undefined"!=typeof module&&module.exports&&(module.exports=Prism),"undefined"!=typeof global&&(global.Prism=Prism);
Prism.languages.markup={comment:/<!--[\s\S]*?-->/,prolog:/<\?[\s\S]+?\?>/,doctype:{pattern:/<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,greedy:!0,inside:{"internal-subset":{pattern:/(\[)[\s\S]+(?=\]>$)/,lookbehind:!0,greedy:!0,inside:null},string:{pattern:/"[^"]*"|'[^']*'/,greedy:!0},punctuation:/^<!|>$|[[\]]/,"doctype-tag":/^DOCTYPE/,name:/[^\s<>'"]+/}},cdata:/<!\[CDATA\[[\s\S]*?]]>/i,tag:{pattern:/<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,greedy:!0,inside:{tag:{pattern:/^<\/?[^\s>\/]+/,inside:{punctuation:/^<\/?/,namespace:/^[^\s>\/:]+:/}},"attr-value":{pattern:/=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,inside:{punctuation:[{pattern:/^=/,alias:"attr-equals"},/"|'/]}},punctuation:/\/?>/,"attr-name":{pattern:/[^\s>\/]+/,inside:{namespace:/^[^\s>\/:]+:/}}}},entity:[{pattern:/&[\da-z]{1,8};/i,alias:"named-entity"},/&#x?[\da-f]{1,8};/i]},Prism.languages.markup.tag.inside["attr-value"].inside.entity=Prism.languages.markup.entity,Prism.languages.markup.doctype.inside["internal-subset"].inside=Prism.languages.markup,Prism.hooks.add("wrap",function(a){"entity"===a.type&&(a.attributes.title=a.content.replace(/&amp;/,"&"))}),Object.defineProperty(Prism.languages.markup.tag,"addInlined",{value:function(a,e){var s={};s["language-"+e]={pattern:/(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,lookbehind:!0,inside:Prism.languages[e]},s.cdata=/^<!\[CDATA\[|\]\]>$/i;var n={"included-cdata":{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,inside:s}};n["language-"+e]={pattern:/[\s\S]+/,inside:Prism.languages[e]};var t={};t[a]={pattern:RegExp("(<__[^]*?>)(?:<!\\[CDATA\\[(?:[^\\]]|\\](?!\\]>))*\\]\\]>|(?!<!\\[CDATA\\[)[^])*?(?=</__>)".replace(/__/g,function(){return a}),"i"),lookbehind:!0,greedy:!0,inside:n},Prism.languages.insertBefore("markup","cdata",t)}}),Prism.languages.html=Prism.languages.markup,Prism.languages.mathml=Prism.languages.markup,Prism.languages.svg=Prism.languages.markup,Prism.languages.xml=Prism.languages.extend("markup",{}),Prism.languages.ssml=Prism.languages.xml,Prism.languages.atom=Prism.languages.xml,Prism.languages.rss=Prism.languages.xml;
