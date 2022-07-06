import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'
import { expect, describe, it } from '@jest/globals'

import { run } from "../src/main";

// shows how the runner will run a javascript action with env / stdout protocol
describe("Github Action", () => {
  it("test runs", () => {
    process.env['INPUT_MILLISECONDS'] = '500'
    const np = process.execPath
    const ip = path.join('lib', 'main.js')
    const options: cp.ExecFileSyncOptions = {
      env: process.env
    }
    console.log(cp.execFileSync(np, [ip], options).toString())
  });

  it("should return hello world", async () => {
    await run()
  });
});