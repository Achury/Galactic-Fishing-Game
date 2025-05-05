module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    // Add any other file paths that contain Tailwind classes
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  // Important for Vite projects
  corePlugins: {
    preflight: true,
  },
};
