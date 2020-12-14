<template>
  <div class="flex justify-between px-2 pt-2 bg-gray-800">
    <div>
      <button
        v-for="stop in store.state.tabs_left"
        :key="`tab-${stop}`"
        class="px-4 py-2 text-sm font-semibold uppercase cursor-default rounded-t-md focus:outline-none"
        :class="{
          'bg-white text-black': store.state.tabActive == stop,
          'hover:bg-black text-white': store.state.tabActive != stop,
        }"
        @click="store.setTab(stop)"
      >
        {{ stop }}
      </button>
    </div>
  </div>
</template>

<script>
import { inject } from "vue";

export default {
  setup() {
    const store = inject("global");

    return { store };
  },
};
</script>
