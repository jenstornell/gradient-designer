module.exports = {
  purge: {
    content: ["./index.php"],
    options: {
      whitelistPatterns: [/^bg-/, /^from-/, /^via-/, /^to-/],
    },
  },
  theme: {
    extend: {},
    fontFamily: {
      body: ["Poppins"],
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
