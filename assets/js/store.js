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
  });
}

console.log("STORE");
