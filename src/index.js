import SwaggerCli from '@apidevtools/swagger-cli';
import { createFilter } from '@rollup/pluginutils';

const ext = /\.ya?ml$/;

/**
 * @type {import('../types').default}
 */
export default function openapi(opts = {}) {
  const options = Object.assign({}, opts);
  const filter = createFilter(options.include, options.exclude);

  return {
    name: 'openapi',

    async transform(_, id) {
      if (!ext.test(id)) return null;
      if (!filter(id)) return null;

      const content = await SwaggerCli.bundle(id, {
        dereference: true,
        wrap: Infinity,
        format: null,
        outfile: null,
      });

      return {
        code: `var data = ${content};\n\nexport default data;\n`,
        map: null, // provide source map if available
      };
    },
  };
}
