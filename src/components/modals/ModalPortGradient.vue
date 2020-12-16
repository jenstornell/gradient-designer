<template>
  <div class="flex flex-col items-end gap-2 mt-2 mr-2">
    <div
      class="flex items-center justify-center p-2 text-white text-opacity-50 bg-black bg-opacity-25 rounded-full fill-current hover:bg-opacity-50 hover:text-opacity-100 focus:outline-none hover:opacity-100"
      title="Get code"
      @click="setModal(true)"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
      >
        <path fill="none" d="M0 0h24v24H0z" />
        <path
          d="M11.95 7.95l-1.414 1.414L8 6.828 8 20H6V6.828L3.465 9.364 2.05 7.95 7 3l4.95 4.95zm10 8.1L17 21l-4.95-4.95 1.414-1.414 2.537 2.536L16 4h2v13.172l2.536-2.536 1.414 1.414z"
        />
      </svg>
    </div>
  </div>
  <div
    class="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50"
    @click="closeModal($event)"
    :class="{ hidden: !modal }"
  >
    <div class="flex flex-col max-w-screen-sm gap-4 p-8 bg-white rounded-lg">
      <div class="flex flex-col gap-1">
        <HeadingSmall title="Export" />
        <div class="mb-2 text-gray-500">
          Export this gradient as JSON.
        </div>

        <div
          class="flex items-center justify-between bg-gray-100 shadow select-all"
        >
          <div
            class="px-6 py-4 text-blue-800"
            style="font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;"
          >
            {{ JSON.stringify(store.state.currentGradient) }}
          </div>
          <div class="px-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path
                d="M15.243 4.515l-6.738 6.737-.707 2.121-1.04 1.041 2.828 2.829 1.04-1.041 2.122-.707 6.737-6.738-4.242-4.242zm6.364 3.535a1 1 0 0 1 0 1.414l-7.779 7.779-2.12.707-1.415 1.414a1 1 0 0 1-1.414 0l-4.243-4.243a1 1 0 0 1 0-1.414l1.414-1.414.707-2.121 7.779-7.779a1 1 0 0 1 1.414 0l5.657 5.657zm-6.364-.707l1.414 1.414-4.95 4.95-1.414-1.414 4.95-4.95zM4.283 16.89l2.828 2.829-1.414 1.414-4.243-1.414 2.828-2.829z"
              />
            </svg>
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-1">
        <HeadingSmall title="Import" />
        <div class="mb-2 text-gray-500">
          Paste a valid exported JSON gradient.<br />
        </div>

        <div class="flex items-center justify-between bg-gray-100 shadow">
          <textarea
            class="w-full h-32 px-6 py-4 text-base text-blue-800 bg-transparent resize-none focus:outline-none"
            style="font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;"
            spellcheck="false"
            v-model="importValue"
          ></textarea>
        </div>
      </div>
      <div class="flex">
        <div :class="{ hidden: !is_error }" class="text-red-600">
          Error in JSON
        </div>
        <button
          class="px-8 py-2 ml-auto text-white rounded cursor-default focus:outline-none bg-lightBlue-600 hover:bg-lightBlue-700"
          @click="importGradient($event)"
        >
          Import
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import HeadingSmall from "@/components/HeadingSmall.vue";
import { inject, ref } from "vue";

export default {
  components: {
    HeadingSmall,
  },
  setup() {
    const store = inject("global");
    let modal = ref(false);
    let importValue = ref("");
    let is_error = ref(false);

    function setModal(value) {
      this.modal = value;
    }

    function importGradient() {
      if (!IsJsonString(this.importValue)) {
        this.is_error = true;
        setTimeout(() => (this.is_error = false), 2000);
        return;
      }
      const obj = JSON.parse(this.importValue);

      store.state.currentGradient = Object.assign(
        store.state.currentGradient,
        obj
      );

      this.modal = false;
      this.importValue = "";
    }

    function IsJsonString(str) {
      try {
        JSON.parse(str);
      } catch (e) {
        return false;
      }
      return true;
    }

    function closeModal(e) {
      if (e.currentTarget != e.target) return;

      this.modal = false;
    }

    return {
      is_error,
      store,
      modal,
      setModal,
      closeModal,
      importValue,
      importGradient,
      IsJsonString,
    };
  },
};
</script>
