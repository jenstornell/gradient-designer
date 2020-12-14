<template>
  <div class="flex flex-col gap-2">
    <div class="flex justify-between gap-2">
      <h2 class="uppercase">
        <span class="font-bold">Color:</span>

        {{ colorLabel }}
      </h2>
      <Switch :id="state" />
    </div>
    <div
      class="flex flex-col gap-1"
      v-if="store.state.currentGradient"
      :class="{
        'opacity-25': !store.state.currentGradient.colors[state].active,
      }"
    >
      <div class="flex flex-wrap gap-1">
        <!-- Extra -->
        <div
          v-for="color in store.state.colors"
          class="flex items-center justify-center w-8 h-8 text-white rounded"
          :key="color"
          :class="`bg-${color} extra-${color}`"
          @click="store.setColor(state, color)"
        >
          <Dot
            :is_hidden="
              store.state.currentGradient.colors[state].color != color
            "
          />
        </div>

        <!-- Grays -->
        <div
          v-for="color in store.state.grays"
          class="flex items-center justify-center w-8 h-8 text-white rounded"
          :key="color"
          :class="`bg-${color}-500`"
          @click="store.setColor(state, color, true)"
        >
          <Dot
            :is_hidden="
              store.state.currentGradient.colors[state].color != color
            "
          />
        </div>

        <div
          v-for="color in store.state.colorsWithShades"
          class="flex items-center justify-center w-8 h-8 rounded"
          :key="color"
          :class="`bg-${color}-500 extra-${color}`"
          @click="store.setColor(state, color, true)"
        >
          <Dot
            :is_hidden="
              store.state.currentGradient.colors[state].color != color
            "
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { inject, computed } from "vue";
import Switch from "@/components/Switch.vue";
import Dot from "@/components/Dot.vue";

export default {
  components: {
    Switch,
    Dot,
  },
  props: {
    title: String,
    state: String,
  },
  setup(props) {
    const store = inject("global");

    const colorLabel = computed(() => {
      if (!store.state.currentGradient) return;
      const stopObj = store.state.currentGradient.colors[props.state];
      if (stopObj && "color" in stopObj) {
        return stopObj["color"];
      }
    });

    return { store, colorLabel };
  },
};
</script>
