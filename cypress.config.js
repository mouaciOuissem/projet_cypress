const { defineConfig } = require("cypress");
import { allureCypress } from "allure-cypress/reporter";


module.exports = defineConfig({
  // JUNIT 
  /*reporter: 'junit',
  reporterOptions: {
    mochaFile: 'results/my-test-output-[hash].xml',
    toConsole: true,
  },*/
  // MOCHAWESOME
  //reporter: 'cypress-mochawesome-reporter',
  e2e: {
    // capture vider screenshots
    video: false,
    screenshotsFolder: 'cypress/screenshots',
    videosFolder: 'cypress/videos',
    setupNodeEvents(on, config) {
      allureCypress(on, config, {
        resultsDir: "allure-results",
      });
      // implement node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on);
      const { plugin: cypressGrepPlugin } = require('@cypress/grep/plugin')
      cypressGrepPlugin(config)
      return config

    },
  },
});
