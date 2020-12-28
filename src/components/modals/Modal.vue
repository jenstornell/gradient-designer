<template>
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    @click="closeModal($event)"
    v-if="state.modal == name"
  >
    <div class="flex flex-col max-w-screen-sm p-8 bg-white rounded-lg">
      <component :is="name" />
    </div>
  </div>
</template>

<script>
import ModalAbout from "@/components/modals/ModalAbout.vue";
import ModalCode from "@/components/modals/ModalCode.vue";
import ModalGradientInfo from "@/components/modals/ModalGradientInfo.vue";
import ModalGradientPort from "@/components/modals/ModalGradientPort.vue";

import vclone from "@/vclone/";

export default {
  props: ["name"],
  components: {
    ModalAbout,
    ModalCode,
    ModalGradientInfo,
    ModalGradientPort,
  },
  setup() {
    const { state, setModal } = vclone;

    function closeModal(e) {
      if (e.currentTarget != e.target) return;

      setModal(false);
    }

    return { state, closeModal };
  },
};
</script>
