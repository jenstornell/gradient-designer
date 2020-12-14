<template>
  <div class="flex flex-col gap-2" v-if="isShade">
    <h2 class="font-bold uppercase">
      Shade {{ store.state.currentGradient.colors[state].color }}
    </h2>
    <div class="flex flex-wrap gap-1">
      <div
        v-for="shade in store.state.shades"
        class="flex items-center justify-center w-8 h-8 text-white rounded"
        :key="`shade-${state}-${shade}`"
        :class="classes(shade)"
        @click="setShade(shade)"
      >
        <Dot
          :is_hidden="store.state.currentGradient.colors[state].shade != shade"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { inject, computed } from "vue";
import Dot from "@/components/Dot.vue";

export default {
  components: {
    Dot,
  },
  props: {
    state: String,
  },
  setup(props) {
    const store = inject("global");

    function classes(shade) {
      const color = store.state.currentGradient.colors[props.state].color;
      let classes = "";

      classes += `bg-${
        store.state.currentGradient.colors[props.state].color
      }-${shade}`;
      classes += !store.state.currentGradient.colors[props.state].active
        ? " opacity-25"
        : "";

      classes += shade < 300 ? ` border border-${color}-300` : "";
      return classes;
    }

    let isShade = computed(() => {
      if (!store.state.currentGradient) return;
      if ("colors" in store.state.currentGradient) {
        const colors = store.state.colorsWithShades;
        const color = store.state.currentGradient.colors[props.state].color;
        return colors.includes(color);
      }
      return false;
    });

    function setShade(shade) {
      const stop_options = store.state.currentGradient.colors[props.state];
      if (!stop_options.active) return;
      stop_options.shade = shade;
    }

    return { store, isShade, setShade, classes };
  },
};
</script>
