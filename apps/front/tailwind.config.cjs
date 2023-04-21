const { join } = require('path');
const {
  createGlobPatternsForDependencies,
} = require('@fabernovel/pes-nx-plugin-next/plugins/createGlobPatternsForDependencies');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, './src/**/*.{ts,tsx}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
