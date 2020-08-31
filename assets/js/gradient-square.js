class GradientSquare extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["gradient", "active"];
  }

  /*get from() {
    if (!this.has("from")) return "";
    return "from-" + this.getAttribute("from");
  }

  get via() {
    if (!this.has("via")) return "";
    return "via-" + this.getAttribute("via");
  }

  get to() {
    if (!this.has("to")) return "";
    return "to-" + this.getAttribute("to");
  }

  get title() {
    if (!this.has("title")) return "";
    return this.getAttribute("title");
  }*/

  get active() {
    if (
      !this.getAttribute("active") ||
      this.getAttribute("active") == "false"
    ) {
      return false;
    }
    return true;
  }

  /* get direction() {
    if (!this.has("direction")) return "bg-gradient-to-r";
    return "bg-gradient-to-" + this.getAttribute("direction");
  }

  has(value) {
    if (
      this.getAttribute(value) == "" ||
      !this.getAttribute(value) ||
      this.getAttribute(value) == "undefined"
    ) {
      return false;
    }
    return true;
  }*/

  get key() {
    return this.getAttribute("key");
  }

  get group() {
    return this.getAttribute("group");
  }

  classes() {
    //console.log(this.key);
    //
    //console.log(store.state[this.group][this.key]);

    console.log(this.data().classes);
    const collection = this.data().classes;

    for (const key in collection) {
      const data = collection[key];
      console.log(data);
    }
  }

  data() {
    return store.state[this.group][this.key];
  }

  renderRoot() {
    return `
    <div class="flex items-center justify-center w-16 h-16 ${this.classes()} rounded" title="${
      this.title
    }">
      ${this.renderActive()}
    </div>
    `;
  }

  renderActive() {
    if (!this.active) return "";
    return `
    <div class="w-5 h-5 bg-gray-700 border-4 border-white rounded-full shadow"></div>
    `;
  }

  attributeChangedCallback(name, oldValue, newValue) {
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
    });
  }
}

customElements.define("gradient-square", GradientSquare);
