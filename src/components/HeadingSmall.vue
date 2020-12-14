<template>
  <h2 v-if="for_id == ''" class="py-1 text-xl font-bold">
    {{ title }}
  </h2>
  <label :for="for_id" v-if="for_id != ''" class="py-1 text-xl font-bold">
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
