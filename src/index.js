const core = require('@actions/core');
const getRulesUrl = require('./scrape');
const rp = require("request-promise-native");

// most @actions toolkit packages have async methods
async function run() {
  try {
    console.log("Starting...");
    const rules_uri = await getRulesUrl();
    core.setOutput('rules_uri', rules_uri);
    core.info(`Downloading Rules from ${rules_uri}...`);
    await rp({ uri: rules_uri });
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
