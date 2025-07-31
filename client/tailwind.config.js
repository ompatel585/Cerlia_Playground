import scrollbar from 'tailwind-scrollbar'

export default {
    content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'], // make sure paths are correct
    theme: {
        extend: {},
    },
    plugins: [scrollbar],
}

