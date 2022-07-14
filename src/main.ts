import * as core from '@actions/core'
import getRules from './scrape/rules'

export default async function run(): Promise<void> {
  try {
    core.info(`Starting...`)
    await getRules()
  } catch (error) {
    core.setFailed(`unexpected error: ${error}`)
    throw new Error(`unexpected error: ${error}`)
  }
}

run()
