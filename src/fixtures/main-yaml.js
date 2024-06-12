import api from "./api.yaml";

/** @type {import("bun:test").expect} */
const e = expect;

e(api.paths["/my/path"].get.summary).toBe("Some GET request");
e(
  api.paths["/my/path"].get.responses["200"].content["application/json"].schema
    .type,
).toBe("object");
