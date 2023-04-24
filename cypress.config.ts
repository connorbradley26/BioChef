import { defineConfig } from "cypress";
const {GoogleSocialLogin} = require('cypress-social-logins').plugins

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on("task", {
        GoogleSocialLogin: GoogleSocialLogin
      })
    },
    baseUrl: 'http://localhost:3000',
  },
  
});
