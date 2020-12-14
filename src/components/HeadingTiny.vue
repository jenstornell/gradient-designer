<template>
  <h2 v-if="!for_id" class="text-sm font-semibold uppercase">
    {{ title }}
  </h2>
  <label :for="for_id" v-if="for_id" class="text-sm font-semibold uppercase">
    {{ title }}
  </label>
</template>

<script>
export default {
  props: {
    title: String,
    for_id: String,
  },
};
</script>
