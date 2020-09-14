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
