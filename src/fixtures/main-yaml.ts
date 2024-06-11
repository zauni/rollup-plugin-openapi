/// <reference path="../../types/yaml.d.ts" />

import type { OpenAPIV3 } from "openapi-types";
import api from "./api.yaml";

const apiToCheck = api as OpenAPIV3.Document;
const successResponse = apiToCheck.paths["/my/path"]?.get?.responses[
  "200"
] as OpenAPIV3.ResponseObject;
const schema = successResponse.content?.["application/json"]
  .schema as OpenAPIV3.SchemaObject;

// @ts-ignore
expect(api.paths["/my/path"].get.summary).toBe("Some GET request");
// @ts-ignore
expect(schema.type).toBe("object");
