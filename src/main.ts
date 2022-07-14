import * as core from '@actions/core'
import {getRulesUrl} from './scrape/rules'

export async function run(): Promise<void> {
  try {
    core.info(`Starting...`)
    const url: string = await getRulesUrl()
    core.info(`Got url: ${url}`)
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message)
      throw error
    }
  }
}

run()
