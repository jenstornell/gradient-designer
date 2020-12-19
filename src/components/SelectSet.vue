<template>
  <div class="px-4 text-gray-500 uppercase bg-gray-800">
    <strong>set:</strong>
    Default
  </div>
</template>

<script>
import { inject } from "vue";

export default {
  setup() {
    const store = inject("global");

    return { store };
  },
};
</script>
