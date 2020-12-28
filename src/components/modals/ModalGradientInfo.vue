<template>
  <div class="flex flex-col gap-1">
    <HeadingSmall for_id="name" title="Gradient name" />
    <div class="mb-2 text-gray-500">
      Name of the selected gradient.
    </div>
    <div>
      <input
        id="name"
        class="w-64 p-2 bg-gray-100 rounded ring-2 ring-gray-200 focus:outline-none focus:ring-2 focus:ring-green-400"
        spellcheck="false"
        autocomplete="off"
        :value="state.currentGradient.name"
        @input="setName($event)"
      />
    </div>
  </div>
</template>

<script>
import HeadingSmall from "@/components/HeadingSmall.vue";
import vclone from "@/vclone/";

export default {
  components: {
    HeadingSmall,
  },
  setup() {
    const { state } = vclone;

    function setName(e) {
      state.currentGradient.name = e.currentTarget.value;
    }

    return { state, setName };
  },
};
</script>
