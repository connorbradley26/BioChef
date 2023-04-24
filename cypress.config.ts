import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on("task", {
        'seed:db' () {
          console.log('sdjdsj'); //just a placeholder
        }
      });
      // implement node event listeners here
    },
    baseUrl: 'http://localhost:3000',
  },
  
});
