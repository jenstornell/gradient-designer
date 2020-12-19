import { reactive, computed, watchEffect } from "vue";

const state = reactive({
  currentGradient: {},
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

// Add empty set
const addSet = function() {
  const set = {
    name: "My set",
    sort: 0,
    gradients: [],
  };
  state.sets.unshift(set); // Add to beginning
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

watchEffect(() => {
  localStorage.setItem("sets", JSON.stringify(state.sets));
});

export default {
  state: state,
  setColor: setColor,
  addSet: addSet,
  addGradient: addGradient,
  outputClasses,
};
