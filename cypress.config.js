import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    setupNodeEvents() {
      // implement node event listeners here
    },
    baseUrl: 'http://localhost:5173',
    specPattern: 'cypress/integration/**/*.spec.js',
    supportFile: 'cypress/support/index.js',
  },
  video: true,
  screenshotOnRunFailure: true,
  viewportWidth: 1280,
  viewportHeight: 720,
});
