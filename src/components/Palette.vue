<template>
  <div class="flex flex-col gap-2">
    <div class="flex justify-between gap-2">
      <h2 class="uppercase">
        <span class="font-bold">Color:</span>
        {{ colorLabel }}
      </h2>
      <Switch :id="stop" />
    </div>
    <div
      class="flex flex-col gap-1"
      v-if="store.state.currentGradient"
      :class="{
        'opacity-25': !store.state.currentGradient.colors[stop].active,
      }"
    >
      <div class="flex flex-wrap gap-1">
        <!-- Extra -->
        <div
          v-for="color in state.specials"
          class="relative flex items-center justify-center w-8 h-8 text-white"
          :key="color"
          @click="store.setColor(stop, color)"
          :title="color"
        >
          <div
            class="absolute inset-0 transition duration-100 ease-in-out transform rounded hover:scale-y-125"
            :class="`bg-${color} extra-${color}`"
          ></div>
          <div
            v-if="color == 'current'"
            class="absolute text-white pointer-events-none"
          >
            C
          </div>
          <div
            class="absolute w-4 h-4 rounded-full pointer-events-none"
            :class="dotClasses(color)"
          ></div>
        </div>

        <div
          v-for="color in colors"
          class="relative flex items-center justify-center w-8 h-8"
          :key="color"
          @click="store.setColor(stop, color, true)"
          :title="color"
        >
          <div
            class="absolute inset-0 transition duration-100 ease-in-out transform rounded hover:scale-y-125"
            :class="`bg-${color}-500 extra-${color}`"
          ></div>
          <div
            class="absolute w-4 h-4 rounded-full pointer-events-none"
            :class="dotClasses(color)"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { inject, computed } from "vue";
import Switch from "@/components/Switch.vue";
import vclone from "@/vclone/";

export default {
  components: {
    Switch,
  },
  props: {
    title: String,
    stop: String,
  },
  setup(props) {
    const store = inject("global");
    const { colors, state } = vclone;

    const colorLabel = computed(() => {
      if (!store.state.currentGradient) return;
      const stopObj = store.state.currentGradient.colors[props.stop];
      if (stopObj && "color" in stopObj) {
        return stopObj["color"];
      }
    });

    function dotClasses(color) {
      const active =
        store.state.currentGradient.colors[props.stop].color == color;
      let classes = "";
      let from = 0;
      let to = 0;

      if (color == "white" || color == "transparent") {
        color = "gray";
        from = 400;
        to = 800;
      } else {
        from = 50;
        to = 400;
      }

      if (["black", "current"].includes(color)) {
        color = "gray";
      }

      classes += active ? "" : " hidden";
      classes += " bg-gradient-to-br";
      classes += ` from-${color}-${from} to-${color}-${to}`;

      return classes;
    }

    return { store, state, colorLabel, dotClasses, colors };
  },
};
</script>
