class PaneImport extends HTMLElement {
  constructor() {
    super();
  }

  renderRoot() {
    return `
      <div class="${
        store.state.current.tab == "import" ? "" : "hidden"
      } gap-2 flex flex-col w-full">
      <div class="font-bold text-sm uppercase">Import</div>
      <textarea spellcheck="false" class="border cursor-auto resize-none h-32 focus:outline-none bg-gray-200 text-sm font-mono"></textarea>
        <div class="flex justify-end">
          <button class="from-gray-300 via-gray-300 to-gray-200 bg-gradient-to-t cursor-default focus:outline-none border border-gray-400 text-xs hover:border-gray-500 font-bold uppercase text-gray-800 rounded-full px-3 py-1">Import</button>
        </div>
      </div>
    `;
  }

  /*  activeClasses() {
    const currentTab = store.state.current.tab;
    return this.tab == currentTab ? "bg-white border-gray-400 topshadow" : "";
  }*/

  connectedCallback() {
    this.innerHTML = this.renderRoot();
    this.onClick();
  }

  onClick() {
    this.querySelector("button").addEventListener("click", () => {
      const value = this.querySelector("textarea").value;
      store.setters.custom(value);
      //store.actions.selectText(document.querySelector("export-code textarea"));
    });
  }
}

customElements.define("pane-import", PaneImport);
