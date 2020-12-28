<template>
  <div
    class="flex items-center justify-between px-4 py-2 text-2xl font-bold text-white font-heading"
  >
    <div>
      Gradient Designer
      <span class="text-base font-normal text-gray-500 font-body"
        >Minefield 2.0</span
      >
    </div>
    <div class="flex items-center gap-4">
      <!--
      <div
        class="px-4 py-1 text-base text-white uppercase rounded fill-current hover:bg-gray-700"
      >
        Port
      </div>
      -->
      <div
        class="p-2 text-white rounded-full fill-current hover:bg-gray-700"
        @click="setModal('ModalAbout')"
        title="About"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path
            d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-1-5h2v2h-2v-2zm2-1.645V14h-2v-1.5a1 1 0 0 1 1-1 1.5 1.5 0 1 0-1.471-1.794l-1.962-.393A3.501 3.501 0 1 1 13 13.355z"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import vclone from "@/vclone/";

export default {
  setup() {
    const { setModal } = vclone;

    return { setModal };
  },
};
</script>
