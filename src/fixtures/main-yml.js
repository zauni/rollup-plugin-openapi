import api from "./api.yml";

expect(api.paths["/my/path"].get.summary).toBe("Some GET request");
expect(
  api.paths["/my/path"].get.responses["200"].content["application/json"].schema
    .type,
).toBe("object");
