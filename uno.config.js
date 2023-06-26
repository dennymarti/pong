import {defineConfig, presetUno} from 'unocss'

export default defineConfig({
    preflights: [
        {
            getCSS: ({ theme }) => '*{box-sizing: border-box;font-family: "Poppins", sans-serif;margin: 0;padding: 0;}\n' +
                'html{scroll-behavior: smooth;}\n' +
                'body{background-color: #EEEEEE;color: #262626;}',
        }
    ],
    rules: [
        ['bg-accent', { 'background-color': '#ffd151' }],
        ['bg-accent-2', { 'background-color': '#edb230' }],
        ['bg-accent-3', { 'background-color': 'color-#EDB230' }],
    ],
});