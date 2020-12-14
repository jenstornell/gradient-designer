<template>
  <button
    class="flex items-center justify-center p-2 m-2 text-white text-opacity-50 transform bg-black bg-opacity-25 rounded-full fill-current hover:bg-opacity-50 hover:text-opacity-100 test focus:outline-none hover:opacity-100"
    :class="classes"
    @click="setDirection(direction)"
  >
    <Dot
      :is_hidden="
        store.state.currentGradient &&
          store.state.currentGradient.direction != direction
      "
    />
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="24"
      height="24"
    >
      <path fill="none" d="M0 0h24v24H0z" />
      <path
        d="M13 16.172l5.364-5.364 1.414 1.414L12 20l-7.778-7.778 1.414-1.414L11 16.172V4h2v12.172z"
      />
    </svg>
  </button>
</template>

<script>
import { inject } from "vue";
import Dot from "@/components/Dot.vue";

export default {
  components: {
    Dot,
  },
  props: {
    direction: String,
    rotate: Number,
    classes: String,
  },
  setup() {
    const store = inject("global");

    function setDirection(direction) {
      store.state.currentGradient.direction = direction;
    }

    return { store, setDirection };
  },
};
</script>
