<template>
  <div
    :class="{ hidden: state.stop_active != 'port' }"
    class="flex flex-col flex-1 gap-8 px-8 py-6 bg-gray-100"
  >
    <div class="flex flex-col gap-1">
      <HeadingSmall for_id="export" title="Export" />
      <div class="mb-2 text-gray-500">
        This will export all gradients and sets.
      </div>
      <textarea
        id="export"
        class="h-64 p-2 resize-none focus:outline-none ring-2 ring-gray-200 focus:ring-green-400"
        :value="JSON.stringify(state.currentGradient)"
        spellcheck="false"
      ></textarea>
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

    return { state };
  },
};
</script>
