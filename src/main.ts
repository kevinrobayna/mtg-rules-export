import * as core from '@actions/core'
import getRules from '../src/scrape/rules'

export async function run(): Promise<void> {
  try {
    core.info(`Starting...`)
    await getRules()
  } catch (error) {
    core.setFailed(`unexpected error: ${error}`)
    throw new Error(`unexpected error: ${error}`)
  }
}

run()
