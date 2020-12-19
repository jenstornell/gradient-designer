<template>
  <div class="flex flex-col flex-1" v-if="store.state.currentGradient">
    <div
      class="flex flex-col flex-1 w-full overflow-auto"
      v-if="!isEmpty(store.state.currentGradient)"
    >
      <Tabs />

      <div class="flex flex-col flex-1">
        <div v-for="stop in state.stops" :key="`palette-${stop}`">
          <div
            :class="{
              hidden: state.stop_active != stop,
            }"
            class="flex flex-col gap-4 p-4 border-b shadow-b-2xl bg-gradient-to-b from-white"
          >
            <Palette :title="stop" :stop="stop" />
            <Shade :stop="stop" />
          </div>
        </div>
        <Port />
      </div>

      <div
        v-if="state.stops.includes(state.stop_active)"
        class="relative h-full min-h-64"
        :class="store.outputClasses.value"
        ref="root"
      >
        <Direction />
      </div>
      <div class="flex" v-if="state.stops.includes(state.stop_active)">
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
import Port from "@/components/Port.vue";

import PreviewMix from "@/components/PreviewMix.vue";
import Direction from "@/components/Direction.vue";

import { inject, watchEffect, ref } from "vue";
import vclone from "@/vclone/";

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
    const { state } = vclone;

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

    return { store, isEmpty, root, state };
  },
};
</script>
