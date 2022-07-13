import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'
import {expect, describe, it} from '@jest/globals'

import {run} from '../src/main'

// shows how the runner will run a javascript action with env / stdout protocol
describe('Github Action', () => {
  it('should run without any errors', async () => {
    await run()
  })
})
