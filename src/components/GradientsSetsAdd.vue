<template>
  <div>
    <button
      @click="store.addSet()"
      class="p-2 m-2 font-bold uppercase bg-gray-300 rounded"
    >
      Add set
    </button>
  </div>
</template>
<script>
import vclone from "@/vclone/";

export default {
  setup() {
    const { state } = vclone;

    return { addSet };
  },
};
</script>
