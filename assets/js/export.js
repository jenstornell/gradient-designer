class ExportCode extends HTMLElement {
  constructor() {
    super();
  }

  renderRoot() {
    return `
      <div class="${
        store.state.current.step == "export" ? "" : "hidden"
      } gap-2 flex flex-col">
      <div class="font-bold text-sm uppercase">Export</div>
      <textarea spellcheck="false" class="cursor-auto resize-none h-32 focus:outline-none bg-gray-200 text-sm font-mono">${JSON.stringify(
        store.state.gradients.custom
      )}</textarea>
        <div class="flex justify-end">
          <button class="from-gray-300 via-gray-300 to-gray-200 bg-gradient-to-t cursor-default focus:outline-none border border-gray-400 text-xs hover:border-gray-500 font-bold uppercase text-gray-800 rounded-full px-3 py-1">Select all</button>
        </div>
      </div>
    `;
  }

  activeClasses() {
    const currentStep = store.state.current.step;
    return this.step == currentStep ? "bg-white border-gray-400 topshadow" : "";
  }

  connectedCallback() {
    if (store.state.current.step !== "export") return;
    this.innerHTML = this.renderRoot();
    this.onClick();
  }

  onClick() {
    this.querySelector("button").addEventListener("click", () => {
      store.actions.selectText(document.querySelector("export-code textarea"));
    });
  }
}

customElements.define("export-code", ExportCode);
