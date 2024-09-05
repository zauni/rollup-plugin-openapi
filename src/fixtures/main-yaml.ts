/// <reference path="../../types/yaml.d.ts" />

import type { OpenAPIV3 } from "openapi-types";
// @ts-ignore This import is resolved by Rollup
import api from "./api.yaml";

const apiToCheck = api as OpenAPIV3.Document;
const successResponse = apiToCheck.paths["/my/path"]?.get?.responses[
  "200"
] as OpenAPIV3.ResponseObject;
const schema = successResponse.content?.["application/json"]
  .schema as OpenAPIV3.SchemaObject;

declare global {
  const expect: typeof import("@std/expect").expect;
}

expect(api.paths?.["/my/path"]?.get?.summary).toBe("Some GET request");
expect(schema.type).toBe("object");
