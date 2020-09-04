const store = {
  state: {
    settings: {
      hasShades: [
        "gray",
        "red",
        "orange",
        "green",
        "teal",
        "blue",
        "indigo",
        "pink",
      ],
      isTransparent: ["transparent"],
    },
    count: 0,
    custom: {},
    current: {},
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
  },
  setters: {
    count(value) {
      store.state.count = value;
    },
    default(obj) {
      store.state.custom.default = obj;
    },
    current(el) {
      console.log(el);
    },
    addGradient(gradient) {
      store.state.custom["gradient_" + Date.now()] = gradient;
    },
    currentGradient(group, gradient) {
      store.state.current.gradient = gradient;
      store.state.current.group = group;
      store.state.current.state = "from";
      console.log(store.state.current);
    },
  },
  getters: {
    count() {
      return store.state.count;
    },
    custom() {
      return store.state.custom;
    },
    presets() {
      return store.state.presets;
    },
    heroes() {
      return store.state.heroes;
    },
    buttons() {
      return store.state.buttons;
    },
    misc() {
      return store.state.misc;
    },
    gradient(group, name) {
      return store.state[group][name];
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
      console.log(collection);
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

console.log(store);
