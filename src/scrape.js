const core = require("@actions/core");
const rp = require("request-promise-native");
const cheerio = require("cheerio");

const RULES_URI = "https://magic.wizards.com/en/rules/";

let getRulesUrl = async function getRulesUrl() {
  core.info(`Fetching rules url from ${RULES_URI}...`);
  const html = await rp({ uri: RULES_URI });
  const $ = cheerio.load(html);
  return $(".cta")
    .toArray()
    .map((anchor) => {
      return anchor.attribs["href"];
    })
    .find((link) => {
      return link.endsWith(".txt");
    });
};

module.exports = getRulesUrl;
