<template>
  <div class="flex flex-col items-end gap-2 mt-2 mr-2">
    <div
      class="flex items-center justify-center p-2 text-white text-opacity-50 bg-black bg-opacity-25 rounded-full fill-current hover:bg-opacity-50 hover:text-opacity-100 focus:outline-none hover:opacity-100"
      title="Info"
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
          d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM11 7h2v2h-2V7zm0 4h2v6h-2v-6z"
        />
      </svg>
    </div>
  </div>
  <div
    class="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50"
    v-if="store.state.currentGradient"
    @click="closeModal($event)"
    :class="{ hidden: !modal }"
  >
    <div class="flex flex-col max-w-screen-sm gap-4 p-8 bg-white rounded-lg">
      <div class="flex flex-col gap-1">
        <HeadingSmall for_id="name" title="Gradient name" />
        <div class="mb-2 text-gray-500">
          Name of the selected gradient.
        </div>
        <div>
          <input
            id="name"
            class="w-64 p-2 bg-gray-100 rounded ring-2 ring-gray-200 focus:outline-none focus:ring-2 focus:ring-green-400"
            spellcheck="false"
            autocomplete="off"
            :value="store.state.currentGradient.name"
            @input="setName($event)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { inject, ref } from "vue";
import HeadingSmall from "@/components/HeadingSmall.vue";

export default {
  components: {
    HeadingSmall,
  },
  setup() {
    const store = inject("global");
    let modal = ref(false);

    function setName(e) {
      store.state.currentGradient.name = e.currentTarget.value;
    }

    function setModal(value) {
      this.modal = value;
    }

    function closeModal(e) {
      if (e.currentTarget != e.target) return;

      this.modal = false;
    }

    return { store, setName, modal, setModal, closeModal };
  },
};
</script>
