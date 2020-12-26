<template>
  <div class="flex justify-between px-2">
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
import vclone from "@/vclone/";

export default {
  setup() {
    const { state, setStopActive } = vclone;

    return { state, setStopActive };
  },
};
</script>
