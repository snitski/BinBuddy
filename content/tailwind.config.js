/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './app/**/*.{js,ts,jsx,tsx}',
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                olive: {
                    50: '#f8f9f5',
                    100: '#f1f0db',
                    200: '#edf1d6',
                    300: '#bac07e',
                    400: '#609966',
                    500: '#637b2d',
                    600: '#4f621e',
                    700: '#3e491a',
                    800: '#2b3215',
                    900: '#1c1f0f',
                },
            },
            typography: ({ theme }) => ({
                olive: {
                    css: {
                        '--tw-prose-body': theme('colors.olive[200]'),
                        '--tw-prose-headings': theme('colors.olive[200]'),
                        '--tw-prose-lead': theme('colors.olive[300]'),
                        '--tw-prose-links': theme('colors.white'),
                        '--tw-prose-bold': theme('colors.white'),
                        '--tw-prose-counters': theme('colors.olive[100]'),
                        '--tw-prose-bullets': theme('colors.olive[100]'),
                        '--tw-prose-hr': theme('colors.olive[200]'),
                        '--tw-prose-quotes': theme('colors.olive[100]'),
                        '--tw-prose-quote-borders': theme('colors.olive[700]'),
                        '--tw-prose-captions': theme('colors.olive[400]'),
                        '--tw-prose-code': theme('colors.white'),
                        '--tw-prose-pre-code': theme('colors.olive[300]'),
                        '--tw-prose-pre-bg': 'rgb(0 0 0 / 50%)',
                        '--tw-prose-th-borders': theme('colors.olive[600]'),
                        '--tw-prose-td-borders': theme('colors.olive[700]'),
                    },
                },
            }),
        },
    },
    plugins: [require('@tailwindcss/typography')],
};
