/** @type {import('tailwindcss').Config} */



module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    // Ekstra olarak dinamik sınıfları da kontrol etmek için
    "./src/app/**/*.{html,ts}", 
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
