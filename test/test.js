const test = require('ava');
const rollup = require('rollup');

const openapi = require('..');

test('converts yaml', async (t) => {
  const build = await rollup.rollup({
    input: './fixtures/main-yaml.js',
    output: {
      file: 'bundle.js',
      format: 'iife'
    },
    plugins: [openapi()],
  });
  const code = await build.generate(
  )

  console.log(code.output);
});
