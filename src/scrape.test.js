const getRulesUrl = require("./scrape");

test("we get a valid url to download the rules", async () => {
  const rules_uri = await getRulesUrl();
  expect(rules_uri).toBe(
    "https://media.wizards.com/2022/downloads/MagicCompRules 20220610.txt"
  );
});
