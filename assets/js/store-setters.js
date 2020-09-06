const store_setters = {
  count(value) {
    store.state.count = value;
  },
  default(obj) {
    store.state.gradients.custom.default = obj;
  },
  current(el) {},
  addGradient() {
    const gradient = store.getters.currentGradient();
    const unique = `gradient_${Date.now()}`;

    store.state.gradients.custom[unique] = gradient;

    store.actions.updateCustomGradients();
    store.actions.activateGradient(unique);
  },
  currentGradient(group, gradient) {
    store.state.current.gradient = gradient;
    store.state.current.group = group;
    store.state.current.step = "from";

    store.actions.render("preview-gradient, preview-colors");
  },
  step(step) {
    store.state.current.step = step;
    store.actions.render("palette-tabs");

    // Set active to preview color
    document.querySelectorAll(`palette-color`).forEach((el) => {
      if (el.getAttribute("step") == step) {
        el.setAttribute("active", "true");
      } else {
        el.removeAttribute("active");
      }
    });
  },
  color(color) {
    store.getters.currentStep().color = color;

    store.actions.updatePreviewColors();
    store.actions.updatePreviewGradients();
  },
};
