const colors = require("tailwindcss/colors");

module.exports = {
  purge: {
    //enabled: true,
    content: ["./src/**/*.vue", "./public/**/*.html"],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      rotate: {
        "135": "135deg",
        "-135": "-135deg",
      },
      minHeight: {
        "64": "16rem",
      },
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: "#000",
      white: "#fff",
      blueGray: colors.blueGray,
      coolGray: colors.coolGray,
      gray: colors.gray,
      trueGray: colors.trueGray,
      warmGray: colors.warmGray,
      red: colors.red,
      orange: colors.orange,
      amber: colors.amber,
      yellow: colors.yellow,
      lime: colors.lime,
      green: colors.green,
      emerald: colors.emerald,
      teal: colors.teal,
      cyan: colors.cyan,
      lightBlue: colors.lightBlue,
      blue: colors.blue,
      indigo: colors.indigo,
      violet: colors.violet,
      purple: colors.purple,
      fuchsia: colors.fuchsia,
      pink: colors.pink,
      rose: colors.rose,
    },
    fontFamily: {
      heading: ["Quicksand"],
      body: ["Poppins", "Helvetica", "Arial"],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
