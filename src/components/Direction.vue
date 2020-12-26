<template>
  <div
    class="absolute top-0 right-0 z-20 flex flex-col items-end justify-center w-24 mt-14"
  >
    <GradientDelete />

    <!--
    <ModalCode />
    <ModalGradientInfo />
    <ModalGradientPort />
    -->
  </div>

  <div class="absolute inset-0 z-10">
    <div v-for="(item, key) in directions" :key="`direction-${key}`">
      <DirectionArrow
        :direction="item.direction"
        :classes="`absolute ${item.classes}`"
      />
    </div>
  </div>
</template>

<script>
import DirectionArrow from "@/components/DirectionArrow.vue";
import GradientDelete from "@/components/GradientDelete.vue";
//import ModalCode from "@/components/modals/ModalCode.vue";
//import ModalGradientInfo from "@/components/modals/ModalGradientInfo.vue";
//import ModalGradientPort from "@/components/modals/ModalGradientPort.vue";
import vclone from "@/vclone/";

export default {
  components: {
    DirectionArrow,
    GradientDelete,
    //ModalCode,
    //ModalGradientInfo,
    //ModalGradientPort,
  },
  setup() {
    const { state, directions } = vclone;

    function setDirection(direction) {
      if (!state.currentGradient) return;
      state.currentGradient.direction = direction;
    }

    return { setDirection, directions };
  },
};
</script>
