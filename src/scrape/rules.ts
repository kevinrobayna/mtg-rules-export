import * as core from '@actions/core'
import * as cheerio from 'cheerio'

export const RULES_URI = 'https://magic.wizards.com/en/rules/'

async function getRulesWebsite(): Promise<string> {
  core.info(`Fetching rules url from ${RULES_URI}...`)
  const response = await fetch(RULES_URI)
  core.info(`Requested rules url ${RULES_URI}... status=${response.status}`)
  if (response.ok) {
    return await response.text()
  } else {
    throw new Error('Could not load MTG Rules website')
  }
}

async function scrapeRulesWebsite(): Promise<string> {
  const html = await getRulesWebsite()
  const $ = cheerio.load(html)
  return $('.cta')
    .toArray()
    .map(anchor => {
      return anchor.attribs['href']
    })
    .map(link => {
      return link.replaceAll(' ', '%20')
    })
    .find(link => {
      return link.endsWith('.txt')
    })
}

export async function getRulesUrl(): Promise<string> {
  const rules_uri = await scrapeRulesWebsite()
  if (rules_uri == null) {
    throw new Error('There was no link to the rules')
  }
  core.setOutput('rules_uri', rules_uri)
  return rules_uri
}
