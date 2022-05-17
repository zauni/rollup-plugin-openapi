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

  // Set of ids which where transformed by this plugin (used for HMR handling)
  const rootIds = new Set();

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

      rootIds.add(id);

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

    /**
     * Handle HMR in Vite
     *
     * This is a Vite specific workaround to [issue #7024](https://github.com/vitejs/vite/issues/7024)
     * @param {import('vite').HmrContext} ctx
     */
    // @ts-ignore
    handleHotUpdate(ctx) {
      // if it is a YAML file and a referenced file, invalidate the root file
      // and send a full-reload command
      if (ext.test(ctx.file) && !rootIds.has(ctx.file) && !ctx.modules.length) {
        if (process && process.env && process.env.DEBUG) {
          console.log('[openapi] reload referenced file', ctx.file);
        }

        for (const rootId of rootIds) {
          const root = ctx.server.moduleGraph.getModuleById(rootId);
          ctx.server.moduleGraph.invalidateModule(root);
        }
        ctx.server.ws.send({
          type: 'full-reload',
          path: '*',
        });
      }
      return ctx.modules;
    },
  };
}
