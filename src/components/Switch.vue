<template>
  <div class="flex items-center gap-2">
    <div
      class="uppercase"
      :class="{ hidden: !thisGradient.colors[stop].active }"
    >
      Active
    </div>
    <div
      class="uppercase"
      :class="{ hidden: thisGradient.colors[stop].active }"
    >
      Inactive
    </div>
    <label :for="`switch-${stop}`">
      <input
        :id="`switch-${stop}`"
        type="checkbox"
        @click="toggleActivate(stop)"
      />
      <div></div>
    </label>
  </div>
</template>

<script>
import vclone from "@/vclone/";

export default {
  props: {
    stop: String,
  },
  setup(props) {
    const { thisGradient, toggleActivate } = vclone;

    return { toggleActivate, thisGradient };
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
