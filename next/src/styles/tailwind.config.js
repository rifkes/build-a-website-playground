/** @type {import('tailwindcss').Config} */

module.exports = {
  theme: {
    screens: {
      'xxs': '0px',
      'xs': '500px',
      'sm': '768px',
      'sm-md': '1024px',
      'md': '1200px',
      'lg': '1500px',
      'xl': '1920px',
      'xxl': '2500px',
    },
    extend: {
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0.5em)' },
          '50%': { transform: 'translateY(-0.5em)' },
        }
      },
      animation: {
        'float': 'float 3s linear infinite',
			},
			colors: {
				'foreground': '#713eff',
				'background': '#fff5d1',
			},
    },
  },
}
