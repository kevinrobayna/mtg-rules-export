import * as core from '@actions/core'
import axios from 'axios'
import * as cheerio from 'cheerio'

export const RULES_URI = 'https://magic.wizards.com/en/rules/'

async function getRulesWebsite(): Promise<string> {
  try {
    core.info(`Fetching rules url from ${RULES_URI}...`)
    const {data, status} = await axios.get(RULES_URI)
    core.info(`Requested rules url ${RULES_URI}... status=${status}`)
    return data
  } catch (error) {
    core.error(`unexpected error: ${error}`)
    throw new Error(`Could not load MTG Rules website`)
  }
}

async function scrapeRulesWebsite(): Promise<string> {
  const html: string = await getRulesWebsite()
  const $ = cheerio.load(html)
  const urls: string[] = $('.cta', html)
    .map((_i, element: cheerio.Element) => {
      if (element.type === 'tag') {
        return element.attribs.href
      }
    })
    .toArray() as unknown as string[]
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return urls.map(e => e.replace(/\s/g, '%20')).find(e => e.endsWith('.txt'))!
}

export default async function getRulesUrl(): Promise<string> {
  const rules_uri = await scrapeRulesWebsite()
  if (rules_uri == null) {
    core.error(`Could not find any rules url on website`)
    throw new Error('There was no link to the rules')
  }
  core.setOutput('rules_uri', rules_uri)
  return rules_uri.toString()
}
