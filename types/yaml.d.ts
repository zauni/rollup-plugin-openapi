/**
 * Declare all *.yaml imports as an OpenAPI.Document type
 */
declare module '*.yaml' {
  import type { OpenAPI } from 'openapi-types';

  const content: OpenAPI.Document;
  export default content;
}

/**
 * Declare all *.yml imports as an OpenAPI.Document type
 */
declare module '*.yml' {
  import type { OpenAPI } from 'openapi-types';

  const content: OpenAPI.Document;
  export default content;
}
