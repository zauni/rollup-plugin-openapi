const test = require('ava');
const rollup = require('rollup');
const typescript = require('@rollup/plugin-typescript');

const openapi = require('..');

async function setup(fileName, additionalPlugins = []) {
  const build = await rollup.rollup({
    input: 'test/fixtures/' + fileName,
    output: {
      file: 'bundle.js',
      format: 'iife',
    },
    plugins: [openapi(), ...additionalPlugins],
  });
  const code = await build.generate({});

  // console.log(code.output[0].code);

  return new Function('t', code.output[0].code);
}

test('converts yaml', async (t) => {
  const fn = await setup('main-yaml.js');

  fn(t);
});

test('converts yml', async (t) => {
  const fn = await setup('main-yml.js');

  fn(t);
});

test('converts yaml in TypeScript', async (t) => {
  const fn = await setup('main-yaml.ts', [
    typescript({ lib: ['es5', 'es6', 'dom'], target: 'es5' }),
  ]);

  fn(t);
});
