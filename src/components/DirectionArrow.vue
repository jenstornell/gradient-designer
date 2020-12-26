<template>
  <button
    class="flex items-center justify-center p-2 m-2 text-white text-opacity-50 transform bg-black bg-opacity-25 rounded-full fill-current hover:bg-opacity-50 hover:text-opacity-100 test focus:outline-none hover:opacity-100"
    :class="additional_classes()"
    @click="setDirection(direction)"
    :title="direction"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="24"
      height="24"
    >
      <path fill="none" d="M0 0h24v24H0z" />
      <path
        d="M13 16.172l5.364-5.364 1.414 1.414L12 20l-7.778-7.778 1.414-1.414L11 16.172V4h2v12.172z"
      />
    </svg>
  </button>
</template>

<script>
import vclone from "@/vclone/";

export default {
  components: {},
  props: {
    direction: String,
    rotate: Number,
    classes: String,
  },
  setup(props) {
    const { thisGradient } = vclone;

    function setDirection(direction) {
      console.log("test");
      console.log(direction);
      thisGradient.value.direction = direction;
    }

    function additional_classes() {
      let classes = props.classes;
      const active =
        thisGradient.value && thisGradient.value.direction == props.direction;

      classes += active
        ? " bg-opacity-100 hover:bg-opacity-100 text-opacity-100"
        : "";

      return classes;
    }

    return { setDirection, additional_classes };
  },
};
</script>
