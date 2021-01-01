<template>
  <div class="flex flex-col items-end gap-2">
    <div
      class="flex items-center justify-center p-2 text-white text-opacity-50 bg-black bg-opacity-25 rounded-full fill-current hover:bg-opacity-50 hover:text-opacity-100 focus:outline-none hover:opacity-100"
      title="Delete"
      @click="setQuestion(true)"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
      >
        <path fill="none" d="M0 0h24v24H0z" />
        <path
          d="M17 6h5v2h-2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H2V6h5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3zm1 2H6v12h12V8zm-9 3h2v6H9v-6zm4 0h2v6h-2v-6zM9 4v2h6V4H9z"
        />
      </svg>
    </div>
    <div class="flex gap-2" :class="{ hidden: !question }">
      <div
        class="flex items-center justify-center p-2 text-white bg-green-600 rounded-full shadow-md fill-current hover:bg-green-700 hover:text-opacity-100 test focus:outline-none hover:opacity-100"
        @click="deleteGradient()"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path
            d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"
          />
        </svg>
      </div>
      <div
        class="flex items-center justify-center p-2 text-white bg-red-600 rounded-full shadow-md fill-current hover:bg-red-700 hover:text-opacity-100 test focus:outline-none hover:opacity-100"
        @click="setQuestion(false)"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path
            d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import vclone from "@/vclone/";

export default {
  setup() {
    const { state } = vclone;
    let question = ref(false);

    function setQuestion(value) {
      this.question = value;
    }

    function deleteGradient() {
      this.setQuestion(false);

      state.sets.forEach((set) => {
        set.gradients.forEach((gradient, index) => {
          if (gradient == state.currentGradient) {
            set.gradients.splice(index, 1);
            state.currentGradient = {};
          }
        });
      });
    }

    return { question, setQuestion, deleteGradient };
  },
};
</script>
