<template>
  <div
    class="flex items-center justify-center p-2 text-white text-opacity-50 bg-black bg-opacity-25 rounded-full fill-current hover:bg-opacity-50 hover:text-opacity-100 focus:outline-none hover:opacity-100"
    :title="title"
    @click="setModal(trigger)"
  >
    <slot></slot>
  </div>
</template>
<script>
import vclone from "@/vclone/";

export default {
  props: ["title", "trigger"],
  components: {},
  setup() {
    const { state, setModal } = vclone;

    return { state, setModal };
  },
};
</script>
