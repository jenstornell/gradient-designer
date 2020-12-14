<template>
  <div class="flex items-center gap-2" v-if="store.state.currentGradient">
    <div
      class="uppercase"
      :class="{ hidden: !store.state.currentGradient.colors[id].active }"
    >
      Active
    </div>
    <div
      class="uppercase"
      :class="{ hidden: store.state.currentGradient.colors[id].active }"
    >
      Inactive
    </div>
    <label :for="`switch-${id}`">
      <input :id="`switch-${id}`" type="checkbox" @click="toggleActivate()" />
      <div></div>
    </label>
  </div>
</template>

<script>
import { inject } from "vue";

export default {
  props: {
    id: String,
  },
  setup(props) {
    const store = inject("global");

    function toggleActivate() {
      store.state.currentGradient.colors[props.id].active = !store.state
        .currentGradient.colors[props.id].active;
    }

    return { store, toggleActivate };
  },
};
</script>

<style scoped>
label {
  background: #ddd;
  display: inline-flex;
  width: 4rem;
  height: 2rem;
  border-radius: 100vh;
}

input {
  display: none;
}

label div {
  width: calc(50% - 8px);
  background: #000;
  border-radius: 100vh;
  margin: 4px;
}

input:checked + div {
  background: #fff;
  margin-left: auto;
}
</style>
