# rollup-plugin-openapi

A Rollup and Vite plugin which converts OpenAPI YAML files to ES6 modules.

This plugin also works with `$ref` references in your YAML files.

## Install

Using npm:

```console
npm install rollup-plugin-openapi --save-dev
```

## Usage

### Rollup

Create a `rollup.config.js` [configuration file](https://www.rollupjs.org/guide/en/#configuration-files) and import the plugin:

```js
import openapi from 'rollup-plugin-openapi';

export default {
  input: 'src/index.js',
  output: {
    dir: 'output',
    format: 'cjs',
  },
  plugins: [openapi()],
};
```

Then call `rollup` either via the [CLI](https://www.rollupjs.org/guide/en/#command-line-reference) or the [API](https://www.rollupjs.org/guide/en/#javascript-api).

### Vite

Create a `vite.config.js` [configuration file](https://vitejs.dev/config/#config-file) and import the plugin:

```js
import openapi from 'rollup-plugin-openapi';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [openapi()],
});
```

Then call `vite` either via the [CLI](https://vitejs.dev/guide/#command-line-interface) or the [API](https://vitejs.dev/guide/api-javascript.html).

### Use

With an accompanying file `src/index.js`, the local `src/api.yaml` file would now be importable as seen below:

_src/api.yaml_

```yaml
openapi: '3.0.0'
info:
  title: My great API
  description: Great description

paths:
  /my/path:
    get:
      summary: Some GET request
      responses:
        '200':
          description: Some response
          content:
            application/json:
              schema:
                type: object
                properties:
                  someKey:
                    type: string
              example:
                someKey: some value
```

_src/index.js_

```js
import api from './api.yaml';

console.log(api);
```

If you have [SwaggerUI in the React flavor](https://www.npmjs.com/package/swagger-ui-react) installed you can now render it. With Vite you get Hot Module Reload for free.

_src/index.jsx_

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

import api from './api.yaml';

ReactDOM.render(<SwaggerUI spec={api} />, document.getElementById('root'));
```

### Use with TypeScript

If you use TypeScript you need to create a file like `yaml.d.ts` with the following contents:

_src/yaml.d.ts_

```ts
/// <reference types="rollup-plugin-openapi/types/yaml" />
```

_src/index.ts_

```ts
import api from './api.yaml';

console.log(api);
```

Otherwise TypeScript will fail with the error `Cannot find module './api.yaml' or its corresponding type declarations.`

## Options

### `exclude`

Type: `String` | `Array[...String]`<br>
Default: `null`

A [minimatch pattern](https://github.com/isaacs/minimatch), or array of patterns, which specifies the files in the build the plugin should _ignore_. By default no files are ignored.

### `include`

Type: `String` | `Array[...String]`<br>
Default: `null`

A [minimatch pattern](https://github.com/isaacs/minimatch), or array of patterns, which specifies the files in the build the plugin should operate on. By default all files are targeted.

## Meta

[LICENSE (MIT)](/LICENSE)
