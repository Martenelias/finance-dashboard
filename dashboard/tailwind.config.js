/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{html,js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      fontSize: {
        xs: '10px',
        sm: '12px',
        base: '16px',
        lg: '24px',
        xl: '32px',
        '2xl': '40px',
        '3xl': '48px',
        '4xl': '56px',
        '5xl': '64px',
        '6xl': '72px',
      },
      fontFamily: {
        'MontserratAlternates': ['Montserrat Alternates', 'sans-serif'],
        'poppins': ['Poppins', 'sans-serif'],
        'OpenSans': ['Open Sans', 'sans-serif'],
      },
      colors: {
        'primary': {
          50: '#ECF7F4',
          500: '#3EAC91',
          700: '#2C7A67',
          900: '#1A483D',
        },
        'secondary': {
          500: '#8B79F1',
          700: '#6356AB',
          900: '#3A3365',
        },
        'tertiary': {
          500: '#DBFD82',
          700: '#9BB45C',
        },
        'background': {
          200: '#99A09F',
          500: '#21312E',
          700: '#121B19',
          900: '#0E1513',
        },
      }
    },
  },
  plugins: [],
}