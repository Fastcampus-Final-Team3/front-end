/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      blue: '#2493FB',
      red: '#FF4D4F',
      lightBlack: '#2D2C38',
      gray88: '#888888',
      line: '#E7E7E7',
      gray: '#F3F4F5',
      lightGray: '#f1f1f5',
      beige: '#FAF9F7',
      lightPurple: '#FCFDFF',
      sky: '#EDF8FC',
      white: '#FFFFFF',
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {
      spacing: {
        '8xl': '96rem',
        '9xl': '128rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
