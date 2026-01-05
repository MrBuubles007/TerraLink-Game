/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                megalogistics: "#003366", // Dark Blue
                fastfash: "#FF007F",      // Hot Pink
                heidehof: "#4CAF50",      // Green
                tech: "#FF8C00",          // Dark Orange
            },
        },
    },
    plugins: [],
}
