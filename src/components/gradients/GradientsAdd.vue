<template>
  <div></div>
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
