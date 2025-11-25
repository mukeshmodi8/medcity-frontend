// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Poppins'", 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        // optional: headings अलternate रखना हो तो:
        heading: ["'Poppins'", 'Georgia', 'serif']
      },
      colors: {
        // existing custom colors...
      }
    }
  },
  plugins: [],
};
