<template>
  <div
    class="absolute top-0 right-0 z-20 flex flex-col items-end justify-center w-24 mt-14"
  >
    <GradientDelete />

    <div class="flex flex-col items-end gap-2 mt-2 mr-2">
      <MenuTrigger trigger="ModalCode" title="Code">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path
            d="M23 12l-7.071 7.071-1.414-1.414L20.172 12l-5.657-5.657 1.414-1.414L23 12zM3.828 12l5.657 5.657-1.414 1.414L1 12l7.071-7.071 1.414 1.414L3.828 12z"
          />
        </svg>
      </MenuTrigger>

      <MenuTrigger trigger="ModalGradientInfo" title="Info">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path
            d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM11 7h2v2h-2V7zm0 4h2v6h-2v-6z"
          />
        </svg>
      </MenuTrigger>

      <MenuTrigger trigger="ModalGradientPort" title="Port">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path
            d="M11.95 7.95l-1.414 1.414L8 6.828 8 20H6V6.828L3.465 9.364 2.05 7.95 7 3l4.95 4.95zm10 8.1L17 21l-4.95-4.95 1.414-1.414 2.537 2.536L16 4h2v13.172l2.536-2.536 1.414 1.414z"
          />
        </svg>
      </MenuTrigger>
    </div>
    <Modal name="ModalCode" />
    <Modal name="ModalGradientInfo" />
    <Modal name="ModalGradientPort" />
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
import Modal from "@/components/modals/Modal.vue";
import MenuTrigger from "@/components/MenuTrigger.vue";
import vclone from "@/vclone/";

export default {
  components: {
    DirectionArrow,
    GradientDelete,
    Modal,
    MenuTrigger,
  },
  setup() {
    const { state, directions, setModal } = vclone;

    function setDirection(direction) {
      if (!state.currentGradient) return;
      state.currentGradient.direction = direction;
    }

    return { setDirection, directions, setModal };
  },
};
</script>
