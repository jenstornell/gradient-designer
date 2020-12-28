import { reactive, computed, watchEffect, readonly } from "vue";
import directions from "@/vclone/directions.js";
import colors from "@/vclone/colors.js";
import shades from "@/vclone/shades.js";
import specials from "@/vclone/specials.js";

const state = reactive({
  stop_active: "from",
  stops: ["from", "via", "to"],
  modal: false,
  currentGradient: {},
  currentGradientId: 0,
  currentSetId: 0,
  sets: [],
  css: "",
});

// Getter - Computed
const thisGradientClasses = computed(() => {
  return currentGradientClasses(state.currentSetId, state.currentGradientId);
});

// Mutations - Functions
const setStopActive = function(stop) {
  state.stop_active = stop;
};

const setModal = function(value) {
  state.modal = value;
};

function setGradientName(value) {
  if (!thisGradient.value) return;

  thisGradient.value.name = value;
}

const currentGradientClasses = function(setId = 0, gradientId = null) {
  const gradient = getGradient(setId, gradientId);

  if (!gradient) return;

  let classes = [];
  state.stops.forEach((stop) => {
    const options = gradient.colors[stop];
    const shade = options.shade ? "-" + options.shade : "";

    if (options.active) {
      classes.push(stop + "-" + options.color + shade);
    }
  });

  return `bg-gradient-to-${gradient.direction} ${classes.join(" ")}`;
};

/*const outputClasses2 = function(gradient) {
  let classes = ["bg-gradient-to-" + gradient.direction];
  state.stops.forEach((stop) => {
    const stop_options = gradient.colors[stop];
    const shade = stop_options.shade ? "-" + stop_options.shade : "";

    if (stop_options.active) {
      classes.push(stop + "-" + stop_options.color + shade);
    }
  });

  return classes.join(" ");
};*/

const setColor = function(stop, color) {
  if (!thisGradient.value || !thisGradient.value.colors[stop].active) return;

  thisGradient.value.colors[stop].color = color;
};

const setShade = function(shade) {
  if (
    !thisGradient.value ||
    !thisGradient.value.colors[state.stop_active].active
  )
    return;

  thisGradient.value.colors[state.stop_active].shade = shade;
};

// Add empty gradient
const addGradient = function(set) {
  set.gradients.push({
    name: "My gradient",
    direction: "r",
    colors: {
      from: {
        color: "cyan",
        shade: 400,
        active: true,
      },
      via: {
        color: "gray",
        shade: 500,
        active: false,
      },
      to: {
        color: "blue",
        shade: 600,
        active: true,
      },
    },
  });
};

// Add empty set
const addSet = function() {
  const set = {
    name: "My set",
    sort: 0,
    gradients: [],
  };
  state.sets.unshift(set); // Add to beginning
};

addSet();
addGradient(state.sets[0]);

const importGradient = function(value) {
  const obj = JSON.parse(value);
  let gradient =
    state.sets[state.currentSetId].gradients[state.currentGradientId];

  state.sets[state.currentSetId].gradients[
    state.currentGradientId
  ] = Object.assign(gradient, obj);
};

const setGradient = function(key) {
  state.currentGradientId = key;
};

const getGradient = function(setId = 0, gradientId) {
  return state.sets[setId].gradients[gradientId];
};

const toggleActivate = function(stop) {
  thisGradient.value.colors[stop].active = !thisGradient.value.colors[stop]
    .active;
};

const thisGradient = computed(() => {
  return state.sets[state.currentSetId].gradients[state.currentGradientId];
});

watchEffect(() => {
  localStorage.setItem("sets", JSON.stringify(state.sets));
});

if (localStorage.getItem("sets") !== null) {
  state.sets = JSON.parse(localStorage.getItem("sets"));
}

state.currentGradient = state.sets[0].gradients[0];

export default {
  state: state,
  shades: readonly(shades),
  specials: readonly(specials),
  colors: readonly(colors),

  toggleActivate,
  //outputClasses2,
  setModal,
  thisGradientClasses,
  setColor,
  setStopActive,
  addGradient,
  setGradient,
  getGradient,
  currentGradientClasses,
  thisGradient,
  addSet,
  setShade,
  directions,
  importGradient,
  setGradientName,
};
