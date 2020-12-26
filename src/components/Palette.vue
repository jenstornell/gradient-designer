<template>
  <div class="flex flex-col gap-2">
    <div class="flex justify-between gap-2">
      <h2 class="uppercase">
        <span class="font-bold">Color:</span>
        {{ thisGradient.colors[stop].color }}
      </h2>

      <Switch :stop="stop" />
    </div>

    <div
      class="flex flex-col gap-1"
      :class="{
        'opacity-25': !thisGradient.colors[stop].active,
      }"
    >
      <div class="flex flex-wrap gap-1">
        <div
          v-for="color in specials"
          class="relative flex items-center justify-center w-8 h-8 text-white"
          :key="color"
          @click="setColor(stop, color)"
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
          @click="setColor(stop, color, true)"
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
    const { colors, setColor, specials, state, thisGradient } = vclone;

    function dotClasses(color) {
      const active = thisGradient.value.colors[props.stop].color == color;
      let classes = "";
      let from = 0;
      let to = 0;

      if (color == "white") {
        color = "coolGray";
        from = 400;
        to = 600;
      } else if (color == "transparent") {
        color = "coolGray";
        from = 500;
        to = 800;
      } else {
        from = 50;
        to = 400;
      }

      if (["black", "current"].includes(color)) {
        color = "coolGray";
      }

      classes += active ? "" : " hidden";
      classes += " bg-gradient-to-br";
      classes += ` from-${color}-${from} to-${color}-${to}`;

      return classes;
    }

    return {
      state,
      specials,
      dotClasses,
      setColor,
      colors,
      thisGradient,
    };
  },
};
</script>
