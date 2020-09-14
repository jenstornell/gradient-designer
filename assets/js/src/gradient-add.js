class GradientAdd extends HTMLElement {
  constructor() {
    super();
  }

  renderRoot() {
    return `
    <div class="flex items-center justify-center w-16 h-16 -mt-1 bg-gray-200 border rounded fill-current">
          <svg class="w-6 h-6 text-gray-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24"
            height="24">
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z" /></svg>
      </div>
    `;
  }

  connectedCallback() {
    this.innerHTML = this.renderRoot();
    this.onClick();
  }

  onClick() {
    this.addEventListener("click", (e) => {
      store.setters.addGradient();
    });
  }
}

customElements.define("gradient-add", GradientAdd);
