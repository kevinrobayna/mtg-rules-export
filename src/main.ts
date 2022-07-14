import * as core from '@actions/core'
import {getRulesUrl} from './scrape/rules'

export async function run(): Promise<void> {
  try {
    core.info(`Starting...`)
    const url: string = await getRulesUrl()
    core.info(`Got url: ${url}`)
  } catch (error) {
    core.setFailed(`unexpected error: ${error}`)
    throw new Error(`unexpected error: ${error}`)
  }
}

run()
