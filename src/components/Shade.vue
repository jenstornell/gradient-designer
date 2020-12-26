<template>
  <div class="flex flex-col gap-2" v-if="isShade">
    <h2 class="font-bold uppercase">
      Shade {{ thisGradient.colors[stop].color }}
    </h2>
    <div class="flex flex-wrap gap-1">
      <div
        v-for="shade in shades"
        class="flex items-center justify-center w-8 h-8 text-white rounded"
        :key="`shade-${stop}-${shade}`"
        :class="classes(shade)"
        @click="setShade(shade)"
        :title="shade"
      >
        <div
          class="absolute w-4 h-4 rounded-full shadow"
          :class="dotClasses(shade)"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import vclone from "@/vclone/";

export default {
  components: {},
  props: {
    stop: String,
  },
  setup(props) {
    const { shades, colors, thisGradient, setShade } = vclone;

    function dotClasses(shade) {
      let classes = "";
      const active = thisGradient.value.colors[props.stop].shade == shade;
      classes += active ? "" : " hidden";
      const color = thisGradient.value.colors[props.stop].color;
      classes += " bg-gradient-to-br";
      if (shade < 400) {
        classes += ` from-${color}-400 to-${color}-800`;
      } else {
        classes += ` from-${color}-50 to${color}-400`;
      }
      return classes;
    }

    function classes(shade) {
      const color = thisGradient.value.colors[props.stop].color;
      let classes = "";

      classes += `bg-${thisGradient.value.colors[props.stop].color}-${shade}`;
      classes += !thisGradient.value.colors[props.stop].active
        ? " opacity-25"
        : "";

      classes += shade < 400 ? ` border border-${color}-400` : "";
      return classes;
    }

    let isShade = computed(() => {
      if (!thisGradient) return;
      console.log(thisGradient);
      const color = thisGradient.value.colors[props.stop].color;
      return colors.includes(color);
    });

    return {
      isShade,
      classes,
      dotClasses,
      shades,
      thisGradient,
      setShade,
    };
  },
};
</script>
