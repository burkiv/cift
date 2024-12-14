// tailwind.config.js
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
        coupleBg: '#fff7f8', // Çok hafif pembe bir ton (arka plan için)
        couplePanel: '#ffdbe0', // Paneller için daha koyu bir pembe
        coupleAccent: '#ff8fa3', // Butonlar, hover durumları
        coupleText: '#333333', // Yazı rengi koyu gri
      },
    },
  },
  plugins: [],
}
