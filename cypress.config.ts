import { defineConfig } from "cypress";
const eyesPlugin = require('@applitools/eyes-cypress')

export default eyesPlugin(defineConfig({
  e2e: {
    setupNodeEvents(on, config) {

    },
    baseUrl: "http://localhost:3000",
  },
  
}));
