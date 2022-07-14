import getRulesText from './client/text'
import getRulesUrl from './client/url'

export default async function getRules(): Promise<string> {
  const rules_uri = await getRulesUrl()
  const rules_txt = await getRulesText(rules_uri)

  return rules_txt
}
