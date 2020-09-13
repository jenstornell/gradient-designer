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
