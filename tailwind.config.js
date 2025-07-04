/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            transitionProperty: {
                height: "height",
                width: "width",
                spacing: "margin, padding",
            },
            colors: {
                "regal-blue": "#243c5a",
            },
        },
    },
    plugins: [
        require("@tailwindcss/forms")({
            strategy: "class", // only generate classes
        }),
    ],
};
