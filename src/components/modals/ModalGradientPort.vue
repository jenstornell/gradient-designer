<template>
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
        {{ JSON.stringify(thisGradient) }}
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
      @click="importGradientToStore($event)"
    >
      Import
    </button>
  </div>
</template>

<script>
import HeadingSmall from "@/components/HeadingSmall.vue";
import { ref } from "vue";
import vclone from "@/vclone/";

export default {
  components: {
    HeadingSmall,
  },
  setup() {
    const { state, setModal, importGradient, thisGradient } = vclone;
    let importValue = ref("");
    let is_error = ref(false);

    function importGradientToStore() {
      if (!IsJsonString(this.importValue)) {
        this.is_error = true;
        setTimeout(() => (this.is_error = false), 2000);
        return;
      }

      importGradient(this.importValue);

      setModal(false);
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

    return {
      is_error,
      state,
      importValue,
      importGradientToStore,
      IsJsonString,
      thisGradient,
    };
  },
};
</script>
