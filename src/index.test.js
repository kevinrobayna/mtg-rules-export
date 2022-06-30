const process = require('process');
const cp = require('child_process');

// shows how the runner will run a javascript action with env / stdout protocol
test('test runs', () => {
  process.env['INPUT_MILLISECONDS'] = 100;
  const result = cp.execSync(`node src/index.js`, {env: process.env}).toString();
  console.log(result);
})
