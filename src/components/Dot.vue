<template>
  <div
    class="absolute w-4 h-4 rounded-full shadow bg-gradient-to-br to-gray-400 from-white ring-1 ring-black ring-opacity-50"
    :class="{ hidden: is_hidden }"
  ></div>
</template>

<script>
export default {
  props: ["is_hidden"],
};
</script>
