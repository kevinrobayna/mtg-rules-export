import * as core from '@actions/core'
import axios from 'axios'

export default async function getRulesText(url: string): Promise<string> {
  try {
    core.info(`Fetching rules url from ${url}...`)
    const {data, status} = await axios.get(url)
    core.info(`Requested rules url ${url}... status=${status}`)
    if (status !== 200) {
      throw new Error(`Could not load rules text from ${url}`)
    }
    return data
  } catch (error) {
    core.error(`unexpected error: ${error}`)
    throw new Error(`Could not load MTG Rules`)
  }
}
