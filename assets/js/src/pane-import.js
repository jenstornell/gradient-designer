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
      <textarea spellcheck="false" class="border cursor-auto resize-none h-32 focus:outline-none bg-gray-200 text-sm font-mono">{"default":{"title":"Hero - Bright","direction":"tl","classes":{"from":{"color":"gray","shade":"400"},"to":{"color":"red","shade":"500"}}}}
      </textarea>
        <div class="flex justify-end gap-2">
          <button data-add class="from-gray-300 via-gray-300 to-gray-200 bg-gradient-to-t cursor-default focus:outline-none border border-gray-400 text-xs hover:border-gray-500 font-bold uppercase text-gray-800 rounded-full px-3 py-1">Add</button>
          <button data-replace class="from-gray-300 via-gray-300 to-gray-200 bg-gradient-to-t cursor-default focus:outline-none border border-gray-400 text-xs hover:border-gray-500 font-bold uppercase text-gray-800 rounded-full px-3 py-1">Replace</button>
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
    this.onReplace();
    this.onAdd();
  }

  onReplace() {
    this.querySelector("[data-replace]").addEventListener("click", () => {
      const value = this.querySelector("textarea").value;
      store.setters.custom(value);
    });
  }

  onAdd() {
    this.querySelector("[data-add]").addEventListener("click", () => {
      const value = this.querySelector("textarea").value;
      store.setters.customAdd(value);
    });
  }
}

customElements.define("pane-import", PaneImport);
