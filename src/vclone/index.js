import { reactive, readonly } from "vue";

const state = reactive({
  stop_active: "from",
  stops: ["from", "via", "to"],
  modal: false,
});
const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
const specials = ["transparent", "current", "black", "white"];
const colors = [
  "blueGray",
  "coolGray",
  "gray",
  "trueGray",
  "warmGray",
  "red",
  "orange",
  "amber",
  "yellow",
  "lime",
  "green",
  "emerald",
  "teal",
  "cyan",
  "lightBlue",
  "blue",
  "indigo",
  "violet",
  "purple",
  "fuchsia",
  "pink",
  "rose",
];

// Mutations - Functions
const setStopActive = function(stop) {
  state.stop_active = stop;
};

const setModal = function(value) {
  state.modal = value;
};

const outputClasses2 = function(gradient) {
  let classes = ["bg-gradient-to-" + gradient.direction];
  state.stops.forEach((stop) => {
    const stop_options = gradient.colors[stop];
    const shade = stop_options.shade ? "-" + stop_options.shade : "";

    if (stop_options.active) {
      classes.push(stop + "-" + stop_options.color + shade);
    }
  });

  return classes.join(" ");
};

export default {
  state: readonly(state),
  shades: readonly(shades),
  specials: readonly(specials),
  colors: readonly(colors),
  outputClasses2,
  setModal,
  setStopActive,
};
