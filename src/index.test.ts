import { expect, test } from "bun:test";
import typescript from "@rollup/plugin-typescript";
import { type Plugin, rollup } from "rollup";

import openapi from ".";

/**
 * Test setup
 */
async function setup(fileName: string, additionalPlugins: Plugin[] = []) {
  const build = await rollup({
    input: `src/fixtures/${fileName}`,
    output: {
      file: "bundle.js",
      format: "iife",
    },
    plugins: [openapi(), ...additionalPlugins],
  });
  const code = await build.generate({});

  // console.log(code.output[0].code);

  return new Function("expect", code.output[0].code);
}

test("converts yaml", async () => {
  const fn = await setup("main-yaml.js");

  fn(expect);
});

test("converts yml", async () => {
  const fn = await setup("main-yml.js");

  fn(expect);
});

test("converts yaml in TypeScript", async () => {
  const fn = await setup("main-yaml.ts", [
    typescript({
      tsconfig: false,
      lib: ["es5", "es6", "dom"],
      target: "es2015",
      module: "esnext",
      allowSyntheticDefaultImports: true,
    }),
  ]);

  fn(expect);
});
