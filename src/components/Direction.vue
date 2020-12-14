<template>
  <DirectionArrow direction="br" classes="absolute top-0 left-0 -rotate-45" />
  <div
    class="absolute top-0 right-0 flex flex-col items-end justify-center w-24"
  >
    <DirectionArrow direction="bl" classes="rotate-45" />
    <GradientDelete />
    <Output />
    <ModalGradientInfo />
  </div>
  <DirectionArrow
    direction="tr"
    classes="absolute bottom-0 left-0 -rotate-135"
  />
  <DirectionArrow
    direction="tl"
    classes="absolute bottom-0 right-0 rotate-135"
  />

  <DirectionArrow
    direction="b"
    classes="absolute top-0 left-1/2 transform-top-center"
  />
  <DirectionArrow
    direction="t"
    classes="absolute bottom-0 left-1/2 transform-bottom-center"
  />
  <DirectionArrow
    direction="r"
    classes="absolute left-0 top-1/2 transform-left-center"
  />
  <DirectionArrow
    direction="l"
    classes="absolute right-0 top-1/2 transform-right-center"
  />
</template>

<script>
import { inject } from "vue";
import DirectionArrow from "@/components/DirectionArrow.vue";
import GradientDelete from "@/components/GradientDelete.vue";
import Output from "@/components/Output.vue";
import ModalGradientInfo from "@/components/ModalGradientInfo.vue";

export default {
  components: {
    DirectionArrow,
    GradientDelete,
    Output,
    ModalGradientInfo,
  },
  setup() {
    const store = inject("global");

    function setDirection(direction) {
      if (!store.state.currentGradient) return;
      store.state.currentGradient.direction = direction;
    }

    return { store, setDirection };
  },
};
</script>
