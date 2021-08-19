// tailwind.config.js
module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}",
   "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        nunito: ["Nunito"],
        lora: ["Lora"],
      },
    
    },
  },
  variants: {
    extend: {
      translate: ["active", "hover"],
      borderWidth: ["hover", "focus"],
      backgroundColor: ['active'],
    
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
};
