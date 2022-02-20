// @ts-check

import SwaggerParser from '@apidevtools/swagger-parser';
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

      // Also watch for changes in referenced YAML files
      const refs = await SwaggerParser.resolve(id);
      const filteredRefs = refs.paths('file').filter((path) => path !== id);

      for (const ref of filteredRefs) {
        this.addWatchFile(ref);
      }

      const content = await SwaggerParser.bundle(id);

      return {
        code: `var data = ${JSON.stringify(
          content,
          null,
          2
        )};\n\nexport default data;\n`,
        map: null, // Swagger CLI doesn't provide a source map
      };
    },
  };
}
