import * as core from '@actions/core'

async function run(): Promise<void> {
  try {
    core.info(`Starting...`)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
