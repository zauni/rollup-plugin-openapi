import typescript from "@rollup/plugin-typescript";
import { type Plugin, rollup } from "@rollup/wasm-node";
import { expect } from "@std/expect";
import { it } from "@std/testing/bdd";

import openapi from "./index.ts";

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
    // @ts-ignore The WASM build of rollup has conflicting types
    plugins: [openapi(), ...additionalPlugins],
  });
  const code = await build.generate({});

  // console.log(code.output[0].code);

  return new Function("expect", code.output[0].code);
}

it("converts yaml", async () => {
  const fn = await setup("main-yaml.js");

  fn(expect);
});

it("converts yml", async () => {
  const fn = await setup("main-yml.js");

  fn(expect);
});

it("converts yaml in TypeScript", async () => {
  const fn = await setup("main-yaml.ts", [
    // @ts-ignore - The rollup plugin is not typed correctly for "node16 from ESM" resolution (https://docs.deno.com/runtime/reference/npm/#module-resolution)
    typescript({
      tsconfig: false,
      lib: ["es5", "es6", "dom"],
      target: "es2015",
      module: "esnext",
      allowSyntheticDefaultImports: true,
      tslib: "dummy",
    }),
  ]);

  fn(expect);
});
