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
      heroHot: {
        title: "Hero",
        direction: "tl",
        classes: {
          from: {
            color: "red",
            shade: "700",
          },
          via: {
            color: "orange",
            shade: "500",
          },
          to: {
            color: "yellow",
            shade: "300",
          },
        },
      },
    },
    buttons: {
      buttonBright: {
        title: "Button - Bright",
        from: "gray-400",
        to: "gray-300",
        direction: "t",
      },
      buttonDark: {
        title: "Button - Dark",
        from: "gray-700",
        to: "gray-600",
        direction: "t",
      },
    },
    misc: {
      equalizer: {
        title: "Equalizer",
        from: "red-500",
        via: "yellow-500",
        to: "green-500",
        direction: "t",
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
  },
};

if (typeof localStorage.twgd == "undefined") {
  const defaults = {
    title: "default",
    from: "red-500",
    via: "red-200",
    to: "red-100",
  };

  store.setters.default(defaults);
  store.getters.custom();
}
