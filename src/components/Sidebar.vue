<template>
  <div class="relative flex overflow-auto">
    <!-- Add set -->
    <div>
      <!-- Sets -->
      <div class="flex flex-col gap-8 px-4 py-4 pt-2">
        <div
          class="flex items-center gap-2"
          v-for="(set, index) in state.sets"
          :key="`set-${index}`"
        >
          <!-- Gradients -->
          <div class="flex gap-2">
            <!-- Gradient -->
            <div
              v-for="(gradient, key) in set.gradients"
              :key="`gradient-${index}-${key}`"
              class="flex items-center justify-center w-12 h-12 text-gray-300 rounded-md ring-2 ring-black ring-opacity-25 ring-offset-0 ring-offset-gray-800"
              :class="currentGradientClasses(0, key)"
              :title="gradient.name"
              @click="setGradient(key)"
            >
              <Dot :is_hidden="state.currentGradientId != key" />
            </div>
          </div>

          <!-- Add gradient -->
          <div class="relative flex">
            <button
              @click="addGradient(set)"
              class="flex items-center justify-center w-12 h-12 text-white rounded-md focus:outline-none hover:bg-gray-700"
              title="Add"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-plus"
              >
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Dot from "@/components/Dot.vue";
import vclone from "@/vclone/";

export default {
  components: {
    Dot,
  },
  setup() {
    const {
      outputClasses2,
      setGradient,
      addGradient,
      state,
      currentGradientClasses,
    } = vclone;

    return {
      setGradient,
      outputClasses2,
      addGradient,
      state,
      currentGradientClasses,
    };
  },
};
</script>
