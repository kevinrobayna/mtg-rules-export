import getRulesUrl from '../../src/scrape/client/url'
import getRulesText from '../../src/scrape/client/text'

export default async function getRules(): Promise<string> {
  const rules_uri = await getRulesUrl()
  const rules_txt = await getRulesText(rules_uri)

  return rules_txt
}
