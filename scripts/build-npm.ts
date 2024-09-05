// ex. scripts/build_npm.ts
import { build } from "@deno/dnt";
import { copy, emptyDir, ensureDir } from "@std/fs";

await emptyDir("./npm");

await copy("src/fixtures", "npm/esm/src/fixtures", { overwrite: true });
await copy("src/fixtures", "npm/script/src/fixtures", { overwrite: true });

await Promise.all(
  ["npm/types", "npm/esm/types", "npm/script/types"].map(async (dir) => {
    await ensureDir(dir);
    await copy("types/yaml.d.ts", `${dir}/yaml.d.ts`, { overwrite: true });
  }),
);

// get version from deno.json file
const denoMeta = await Deno.readFile("deno.json");
const decoder = new TextDecoder();
const data = decoder.decode(denoMeta);
const { version } = JSON.parse(data);

await build({
  entryPoints: ["./src/index.ts"],
  outDir: "./npm",
  shims: {
    // see JS docs for overview and more options
    deno: true,
  },
  importMap: "deno.json",
  package: {
    // package.json properties
    name: "rollup-plugin-openapi",
    version,
    description:
      "A Rollup and Vite plugin which converts OpenAPI YAML files to ES6 modules.",
    license: "MIT",
    repository: {
      type: "git",
      url: "git+https://github.com/zauni/rollup-plugin-openapi.git",
    },
    author: "Matthias Zaunseder",
    bugs: {
      url: "https://github.com/zauni/rollup-plugin-openapi/issues",
    },
    homepage: "https://github.com/zauni/rollup-plugin-openapi#readme",
    engines: {
      node: ">=18.0.0",
    },
    exports: {
      "./yaml": {
        "types": "./types/yaml.d.ts",
      },
    },
    keywords: [
      "rollup",
      "vite",
      "plugin",
      "rollup-plugin",
      "vite-plugin",
      "openapi",
      "swagger",
      "yaml",
    ],
  },
  compilerOptions: {
    lib: ["ESNext"],
  },
});

await copy("LICENSE", "npm/LICENSE");
await copy("README.md", "npm/README.md");
