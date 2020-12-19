<template>
  <div class="flex justify-between px-2 pt-2 bg-gray-800">
    <div>
      <button
        v-for="stop in state.stops"
        :key="`tab-${stop}`"
        class="px-4 py-2 text-sm font-semibold uppercase cursor-default rounded-t-md focus:outline-none"
        :class="{
          'bg-white text-black': state.stop_active == stop,
          'hover:bg-black text-white': state.stop_active != stop,
        }"
        @click="setStopActive(stop)"
      >
        {{ stop }}
      </button>
    </div>
  </div>
</template>

<script>
import { inject } from "vue";
import vclone from "@/vclone/";

export default {
  setup() {
    const store = inject("global");
    const { state, setStopActive } = vclone;

    return { store, state, setStopActive };
  },
};
</script>
