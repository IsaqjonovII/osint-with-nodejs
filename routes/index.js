const { uploadData, search } = require("../controllers");

async function routes(fastify, _) {
  fastify.post("/user", uploadData);
  fastify.get("/user", search);
}

module.exports = routes;
