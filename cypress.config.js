const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://reqres.in/api', // Base URL untuk API Reqres
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
