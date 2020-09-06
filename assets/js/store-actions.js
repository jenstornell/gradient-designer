const store_actions = {
  // Update preview colors
  updatePreviewColors() {
    document.querySelectorAll("preview-colors").forEach((el) => {
      el.attributeChangedCallback();
    });
  },
  // Update preview gradients
  updatePreviewGradients() {
    document.querySelectorAll("preview-gradient").forEach((el) => {
      el.attributeChangedCallback();
    });
  },
  // Update custom gradients
  updateCustomGradients() {
    document
      .querySelector('gradient-squares[group="custom"]')
      .attributeChangedCallback();
  },
  // Activate gradient
  activateGradient(name) {
    document
      .querySelector(`gradient-square[active="true"]`)
      .removeAttribute("active");
    document
      .querySelector(`gradient-square[key="${name}"]`)
      .setAttribute("active", "true");
  },
  onClickGradient(group, name) {
    /*store.setters.currentGradient(group, name);
    const collection = store.getters.gradient(group, name);

    // Set preview buttons
    document
      .querySelectorAll("preview-gradient, preview-colors")
      .forEach((el) => {
        el.setAttribute("group", group);
        el.setAttribute("name", name);
      });
      */
  },
  render(selector) {
    document.querySelectorAll(selector).forEach((el) => {
      el.connectedCallback();
    });
  },
  selectText(el) {
    const range = document.createRange();
    range.selectNode(el);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
  },
};
