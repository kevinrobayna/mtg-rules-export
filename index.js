const core = require('@actions/core');
const wait = require('./wait');
const rp = require("request-promise-native");
const fs = require("fs");
const cheerio = require("cheerio");

async function downloadBoxScoreHtml() {
  // where to download the HTML from
  const uri = "https://magic.wizards.com/en/rules/";
  // the output filename
  const filename = "rules.html";
  // check if we already have the file
  const fileExists = fs.existsSync(filename);
  if (fileExists) {
    console.log(
      `Skipping download for ${uri} since ${filename} already exists.`
    );
    return;
  }
  // download the HTML from the web server
  console.log(`Downloading HTML from ${uri}...`);
  const results = await rp({ uri: uri });
  // save the HTML to disk
  await fs.promises.writeFile(filename, results);
}

async function getRulesUrl() {
  console.log("Parsing box score HTML...");
  const htmlFilename = "rules.html";
  const html = await fs.promises.readFile(htmlFilename);
  const $ = cheerio.load(html);
  return $(".cta")
    .toArray()
    .map((anchor) => {
      return anchor.attribs["href"];
    })
    .find((link) => {
      return link.endsWith(".txt");
    });
}

// most @actions toolkit packages have async methods
async function run() {
  try {
    console.log("Starting...");
    await downloadBoxScoreHtml();
    const rules_uri = await getRulesUrl();
  
    console.log(`Downloading HTML from ${rules_uri}...`);
    const results = await rp({ uri: rules_uri });
    await fs.promises.writeFile("rules.txt", results);

    const ms = core.getInput('milliseconds');
    core.info(`Waiting ${ms} milliseconds ...`);

    core.debug((new Date()).toTimeString()); // debug is only output if you set the secret `ACTIONS_RUNNER_DEBUG` to true
    await wait(parseInt(ms));
    core.info((new Date()).toTimeString());

    core.setOutput('time', new Date().toTimeString());
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
