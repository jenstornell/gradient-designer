class PaneDirection extends HTMLElement {
  constructor() {
    super();
  }

  renderRoot() {
    return `
    <div class="flex flex-col gap-2 ${this.allowed() ? "" : "hidden"}">
      <div class="grid grid-flow-row text-gray-500 fill-current"
      style="grid-template-columns: repeat(3, minmax(0, min-content));">
      <button data-class="tl"
        class="w-6 border border-transparent rounded hover:border-gray-500 focus:outline-none">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <path fill="none" d="M0 0h24v24H0z"></path>
          <path d="M9.414 8l8.607 8.607-1.414 1.414L8 9.414V17H6V6h11v2z"></path>
        </svg>
      </button>
      <button data-class="t"
        class="w-6 border border-transparent rounded hover:border-gray-500 focus:outline-none">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <path fill="none" d="M0 0h24v24H0z"></path>
          <path d="M13 7.828V20h-2V7.828l-5.364 5.364-1.414-1.414L12 4l7.778 7.778-1.414 1.414L13 7.828z"></path>
        </svg>
      </button>
      <button data-class="tr"
        class="w-6 border border-transparent rounded hover:border-gray-500 focus:outline-none">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <path fill="none" d="M0 0h24v24H0z"></path>
          <path d="M16.004 9.414l-8.607 8.607-1.414-1.414L14.589 8H7.004V6h11v11h-2V9.414z"></path>
        </svg>
      </button>
      <button data-class="l"
        class="w-6 border border-transparent rounded hover:border-gray-500 focus:outline-none">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <path fill="none" d="M0 0h24v24H0z"></path>
          <path d="M7.828 11H20v2H7.828l5.364 5.364-1.414 1.414L4 12l7.778-7.778 1.414 1.414z"></path>
        </svg>
      </button>
      <div></div>
      <button data-class="r"
        class="text-gray-800 bg-gray-300 border border-transparent rounded focus:outline-none">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <path fill="none" d="M0 0h24v24H0z"></path>
          <path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"></path>
        </svg>
      </button>
      <button data-class="bl"
        class="w-6 border border-transparent rounded hover:border-gray-500 focus:outline-none">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <path fill="none" d="M0 0h24v24H0z"></path>
          <path d="M9 13.59l8.607-8.607 1.414 1.414-8.607 8.607H18v2H7v-11h2v7.585z"></path>
        </svg>
      </button>
      <button data-class="b"
        class="w-6 border border-transparent rounded hover:border-gray-500 focus:outline-none">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <path fill="none" d="M0 0h24v24H0z"></path>
          <path d="M13 16.172l5.364-5.364 1.414 1.414L12 20l-7.778-7.778 1.414-1.414L11 16.172V4h2v12.172z">
          </path>
        </svg>
      </button>
      <button data-class="br"
        class="w-6 border border-transparent rounded hover:border-gray-500 focus:outline-none">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <path fill="none" d="M0 0h24v24H0z"></path>
          <path d="M14.59 16.004L5.982 7.397l1.414-1.414 8.607 8.606V7.004h2v11h-11v-2z"></path>
        </svg>
      </button>
    </div>
    </div>
    `;
  }

  allowed() {
    return ["direction"].includes(store.state.current.tab);
  }

  connectedCallback() {
    this.innerHTML = this.renderRoot();
    this.onClick();
  }

  onClick() {
    this.querySelectorAll("button").forEach((item) => {
      item.addEventListener("click", (e) => {
        const direction = e.currentTarget.dataset.class;
        const current = store.state.current;
        store.state.gradients[current.group][
          current.gradient
        ].direction = direction;
        console.log(store.state.gradients);
      });
    });
  }
}

customElements.define("pane-direction", PaneDirection);
