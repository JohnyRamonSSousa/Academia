/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#E63946', // Vibrant Red
                secondary: '#1D3557', // Deep Navy
                dark: '#121212', // Dark Background
                light: '#F1FAEE', // Off-white
                accent: '#A8DADC', // Soft Blue for contrast
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                heading: ['Montserrat', 'sans-serif'], // Strong font for headers
            },
        },
    },
    plugins: [],
}
