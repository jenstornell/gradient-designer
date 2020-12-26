<template>
  <div
    v-for="(set, index) in state.sets"
    :key="`set-${index}`"
    class="py-2 bg-white"
  >
    <div class="font-bold">
      {{ set.name }}
    </div>
    <Gradients :set="set" />

    <div>
      <button @click="addGradient(set.name)">Adda</button>
    </div>
  </div>
</template>

<script>
import Gradients from "@/components/gradients/Gradients.vue";
//import GradientsAdd from "@/components/gradients/GradientsAdd.vue";
import vclone from "@/vclone/";

export default {
  components: {
    Gradients,
    //GradientsAdd,
  },

  setup() {
    const { addGradient } = vclone;

    return { addGradient };
  },
};
</script>
