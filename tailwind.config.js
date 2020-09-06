module.exports = {
  purge: {
    content: ["./index.html"],
    options: {
      whitelistPatterns: [/^bg-/, /^from-/, /^via-/, /^to-/],
    },
  },
  theme: {
    extend: {},
    fontFamily: {
      body: ["Poppins"],
      mono: [
        "Menlo",
        "Monaco",
        "Consolas",
        "Liberation Mono",
        "Courier New",
        "monospace",
      ],
    },
    screens: {
      sm: "840px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
  },
  variants: {},
  plugins: [],
};
