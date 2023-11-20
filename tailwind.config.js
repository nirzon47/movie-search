/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['*.html'],
	theme: {
		extend: {
			fontFamily: {
				poppins: ['Poppins', 'sans-serif'],
				geist: ['Geist', 'sans-serif'],
			},
		},
	},
	plugins: [require('daisyui')],
}
