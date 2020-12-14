import { reactive, computed, watchEffect } from "vue";

/*const cache = {
  items: [],
};*/
const state = reactive({
  shades: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900],
  prefix: "",
  modal: false,
  stops: ["from", "via", "to"],
  tabs_left: ["from", "via", "to"],
  tabActive: "from",
  colors: ["transparent", "current", "black", "white"],
  grays: [],
  output_css: "",
  colorsWithShades: [
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
  ],
  currentGradient: {},
  currentSetName: "Default",
  sets: [
    {
      name: "Default",
      sort: 0,
      gradients: [
        {
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
        },
      ],
    },
  ],
});

if (localStorage.getItem("sets") !== null) {
  state.sets = JSON.parse(localStorage.getItem("sets"));
}

state.currentGradient = state.sets[0].gradients[0];

const model = reactive({});

// Add empty set
const addSet = function() {
  const set = {
    name: "My set",
    sort: 0,
    gradients: [],
  };
  state.sets.unshift(set);
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

const setTab = function(stop) {
  state.tabActive = stop;
};

// Set color
const setColor = function(stop, color, has_shade = false) {
  const current = state.currentGradient;

  // Add state if not exists
  if (!(stop in current.colors)) {
    current.colors[stop] = {}; // Key måste vara nummer eller inget alls
  }

  if (!current.colors[stop].active) return;

  // Check if shade exists
  const shade_isset = "shade" in current.colors[stop];

  // Add color
  Object.assign(current.colors[stop], { color: color });

  // Set shade if not set
  if (has_shade && !shade_isset) {
    Object.assign(current.colors[stop], { shade: 500 });
  } else if (!has_shade && shade_isset) {
    delete current.colors[stop].shade;
  }
};

const outputClasses = computed(() => {
  if (!state.currentGradient) return;
  let classes = ["bg-gradient-to-" + state.currentGradient.direction];
  ["from", "via", "to"].forEach((stop) => {
    if (!("colors" in state.currentGradient)) return;
    const stop_options = state.currentGradient.colors[stop];
    const shade = stop_options.shade ? "-" + stop_options.shade : "";

    if (stop_options.active) {
      classes.push(stop + "-" + stop_options.color + shade);
    }
  });

  return classes.join(" ");
});

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

watchEffect(() => {
  localStorage.setItem("sets", JSON.stringify(state.sets));
});

export default {
  state: state,
  model: model,
  setColor: setColor,
  addSet: addSet,
  addGradient: addGradient,
  outputClasses,
  outputClasses2,
  setTab,
};
