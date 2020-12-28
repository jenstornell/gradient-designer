<template>
  <div
    class="flex justify-between flex-1 gap-8 p-4"
    :class="{
      'bg-white': type == 'white',
      'bg-black': type == 'black',
      'text-white': type == 'black',
    }"
  >
    <div class="flex flex-col gap-2">
      <HeadingTiny title="Gradient Preview" />
      <button
        class="w-32 h-10 rounded-full cursor-default focus:outline-none"
        :class="thisGradientClasses"
      ></button>
    </div>
    <div class="flex flex-col items-end gap-2">
      <HeadingTiny title="Gradient Colors" />
      <div class="flex gap-1">
        <div
          v-for="(item, key) in data"
          class="w-8 h-8 rounded"
          :key="item.key"
          :class="item.classes"
          :title="item.title"
          @click="state.stop_active = key"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import HeadingTiny from "@/components/HeadingTiny.vue";
import vclone from "@/vclone/";

export default {
  props: ["type"],
  components: {
    HeadingTiny,
  },
  setup(props) {
    const { state, thisGradientClasses } = vclone;

    const data = computed(() => {
      if (!state.currentGradient) return {};

      let out = {};
      state.stops.forEach((stop) => {
        const stop_options = state.currentGradient.colors[stop];
        let classes = "";
        let shade = "shade" in stop_options ? `-${stop_options.shade}` : "";
        classes += `bg-${stop_options.color}${shade}`;
        classes += !stop_options.active ? " hidden" : "";
        classes +=
          stop_options.shade < 300
            ? ` border border-${stop_options.color}-300`
            : "";
        classes +=
          stop_options.color == "white" || stop_options.color == "transparent"
            ? " border border-gray-300"
            : "";

        out[stop] = {
          key: `preview-mix-${props.type}-${stop}`,
          title: stop,
          classes: classes,
        };
      });
      return out;
    });

    /*
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
    */

    return { data, state, thisGradientClasses };
  },
};
</script>
