/// <reference path="../../types/yaml.d.ts" />

import { OpenAPIV3 } from 'openapi-types';
import api from './api.yaml';

const apiToCheck = api as OpenAPIV3.Document;
const successResponse = apiToCheck.paths['/my/path']?.get?.responses[
  '200'
] as OpenAPIV3.ResponseObject;
const schema = successResponse.content?.['application/json']
  .schema as OpenAPIV3.SchemaObject;

// @ts-ignore
t.is(api.paths['/my/path'].get.summary, 'Some GET request');
// @ts-ignore
t.is(schema.type, 'object');
