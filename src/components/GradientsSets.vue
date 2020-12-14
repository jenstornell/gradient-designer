<template>
  <div
    v-for="(set, index) in store.state.sets"
    :key="`set-${index}`"
    class="py-2 bg-white"
  >
    <div class="font-bold">
      {{ set.name }}
    </div>
    <Gradients :set="set" />

    <div>
      <button @click="store.addGradient(set.name)">Adda</button>
    </div>
  </div>
</template>

<script>
import { inject } from "vue";
import Gradients from "@/components/gradients/Gradients.vue";
//import GradientsAdd from "@/components/gradients/GradientsAdd.vue";

export default {
  components: {
    Gradients,
    //GradientsAdd,
  },

  setup() {
    const store = inject("global");

    return { store };
  },
};
</script>
