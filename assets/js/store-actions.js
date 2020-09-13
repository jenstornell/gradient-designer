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
  selectText(el) {
    const range = document.createRange();
    range.selectNode(el);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
  },
};
