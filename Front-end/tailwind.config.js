const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  content: ["./src/**/*.{html,js}"],
  darkMode: "class",
  theme: {
    extend: {},
  },
  plugins: [],
});
