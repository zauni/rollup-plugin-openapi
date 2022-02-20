import pkg from './package.json';

/**
 * @type {import('rollup').RollupOptions}
 */
const config = {
  input: 'src/index.js',
  external: Object.keys(pkg.dependencies),
  output: [
    { file: pkg.main, format: 'cjs', sourcemap: true, exports: 'auto' },
    { file: pkg.module, format: 'es', sourcemap: true },
  ],
};

export default config;
