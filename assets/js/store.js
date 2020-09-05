const store = {
  state: {
    settings: {
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
      isTransparent: ["transparent"],
    },
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
    count: 0,
    current: {
      gradient: "default",
      group: "custom",
      step: "from",
    },
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
    gradients: store_presets,
  },
  setters: {
    count(value) {
      store.state.count = value;
    },
    default(obj) {
      store.state.gradients.custom.default = obj;
    },
    current(el) {
      //console.log(el);
    },
    addGradient(gradient) {
      store.state.gradients.custom["gradient_" + Date.now()] = gradient;
    },
    currentGradient(group, gradient) {
      store.state.current.gradient = gradient;
      store.state.current.group = group;
      store.state.current.step = "from";
    },
    step(step) {
      store.state.current.step = step;

      // Set active to preview color
      document.querySelectorAll(`palette-color`).forEach((el) => {
        if (el.getAttribute("step") == step) {
          el.setAttribute("active", "true");
        } else {
          el.removeAttribute("active");
        }
      });

      // Set active tab
      document.querySelectorAll(`palette-tab-item`).forEach((el) => {
        if (el.getAttribute("name") == step) {
          el.setAttribute("active", "true");
        } else {
          el.removeAttribute("active");
        }
      });
    },
    color(color) {
      const group = store.state.current.group;
      const step = store.state.current.step;
      const gradient = store.state.current.gradient;

      store.state.gradients[group][gradient].classes[step].color = color;

      document.querySelectorAll("preview-button").forEach((el) => {
        el.attributeChangedCallback();
      });

      document.querySelectorAll("preview-colors").forEach((el) => {
        el.attributeChangedCallback();
      });

      document.querySelector("preview-hero").attributeChangedCallback();
    },
  },
  getters: {
    count() {
      return store.state.count;
    },
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
    currentColor() {
      const current = store.state.current;
      return store.getters.currentGradient().classes[current.step].color;
    },
    currentShade() {
      const current = store.state.current;
      return store.getters.currentGradient().classes[current.step].shade;
    },
  },
  actions: {
    onClickGradientAdd() {
      const gradient = store.state.default;
      store.setters.addGradient(gradient);

      document
        .querySelector('gradient-squares[group="custom"]')
        .setAttribute("time", Date.now());
    },
    onClickGradient(group, name) {
      store.setters.currentGradient(group, name);
      const collection = store.getters.gradient(group, name);
      //console.log(collection);

      // Set preview hero
      const preview_hero = document.querySelector("preview-hero");
      preview_hero.setAttribute("group", group);
      preview_hero.setAttribute("name", name);

      // Set preview buttons
      document
        .querySelectorAll("preview-button, preview-colors")
        .forEach((el) => {
          el.setAttribute("group", group);
          el.setAttribute("name", name);
        });
    },
  },
};

if (typeof localStorage.twgd == "undefined") {
  const defaults = {
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
  };

  store.setters.default(defaults);
  store.getters.custom();
}

//console.log(store);
