<template>
  <div class="flex flex-col h-full overflow-hidden font-body">
    <div class="bg-gradient-to-b from-trueGray-900 to-trueGray-800">
      <Top />
      <SelectSet />
      <Sidebar />
      <Tabs />
    </div>
    <!-- Main -->
    <div class="flex flex-col flex-1" v-if="thisGradient">
      <div class="flex flex-col flex-1 w-full overflow-auto">
        <!-- Palettes -->
        <div class="flex flex-col flex-1">
          <!-- Palette -->
          <div v-for="stop in state.stops" :key="`palette-${stop}`">
            <div
              class="flex flex-col gap-4 p-4 border-b shadow-b-2xl bg-gradient-to-b from-white"
              :class="{ hidden: state.stop_active !== stop }"
            >
              <Palette :title="stop" :stop="stop" />
              <Shade :stop="stop" />
            </div>
          </div>
          <!--<Port />-->
        </div>

        <div
          v-if="state.stops.includes(state.stop_active)"
          class="relative h-full min-h-64"
          :class="thisGradientClasses"
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
    <Modal name="ModalAbout" />
  </div>
</template>

<script>
// Components
import Sidebar from "@/components/Sidebar.vue";
import Tabs from "@/components/Tabs.vue";
import SelectSet from "@/components/SelectSet.vue";
import Top from "@/components/Top.vue";
import Modal from "@/components/modals/Modal.vue";
import Palette from "@/components/Palette.vue";
import Shade from "@/components/Shade.vue";
import Direction from "@/components/Direction.vue";
import PreviewMix from "@/components/PreviewMix.vue";

import vclone from "@/vclone/";

export default {
  name: "App",
  components: {
    Modal,
    Palette,
    SelectSet,
    Sidebar,
    Tabs,
    Top,
    Shade,
    Direction,
    PreviewMix,
  },
  setup() {
    const { state, thisGradientClasses, thisGradient } = vclone;

    return { state, thisGradientClasses, thisGradient };
  },
};
</script>
