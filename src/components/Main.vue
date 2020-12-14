<template>
  <div class="flex flex-col flex-1" v-if="store.state.currentGradient">
    <div
      class="flex flex-col flex-1 w-full overflow-auto"
      v-if="!isEmpty(store.state.currentGradient)"
    >
      <Tabs />

      <div class="flex flex-col flex-1">
        <div v-for="stop in store.state.stops" :key="`palette-${stop}`">
          <div
            :class="{
              hidden: store.state.tabActive != stop,
            }"
            class="flex flex-col gap-4 p-4 bg-white"
          >
            <Palette :title="stop" :state="stop" />
            <Shade :state="stop" />
          </div>
        </div>
        <Port />
      </div>

      <div
        v-if="store.state.tabs_left.includes(store.state.tabActive)"
        class="relative h-full min-h-64"
        :class="store.outputClasses.value"
        ref="root"
      >
        <Direction />
      </div>
      <div
        class="flex"
        v-if="store.state.tabs_left.includes(store.state.tabActive)"
      >
        <PreviewMix type="white" />
        <PreviewMix type="black" />
      </div>
    </div>
  </div>
</template>

<script>
import Palette from "@/components/Palette.vue";
import Shade from "@/components/Shade.vue";
import Tabs from "@/components/Tabs.vue";
import Output from "@/components/Output.vue";
import Port from "@/components/Port.vue";

import PreviewMix from "@/components/PreviewMix.vue";
import Direction from "@/components/Direction.vue";

import { inject, watchEffect, ref } from "vue";

export default {
  components: {
    Palette,
    Shade,
    Port,

    Direction,
    Tabs,
    PreviewMix,
  },
  setup() {
    const store = inject("global");
    const root = ref(null);

    function isEmpty(obj) {
      if (!obj) return;
      return Object.keys(obj).length === 0;
    }

    watchEffect(() => {
      if (root.value) {
        store.state.css = window
          .getComputedStyle(root.value)
          .getPropertyValue("background-image");
      }
    });

    return { store, isEmpty, Output, root };
  },
};
</script>
