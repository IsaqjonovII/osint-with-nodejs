const fastify = require("fastify")({
  logger: true,
  bodyLimit: 100 * 1024 * 1024,
});
const mongoose = require("mongoose");
const cors = require("@fastify/cors");
require("dotenv").config();

//! Importing routes
const routes = require("./routes");

//! Connected
fastify.get("/", (_, reply) => {
  reply.send("this is an osint tool built with nodejs dude!!!");
});

//! Connecting to database
mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log("Connected to DB"))
  .catch((error) => console.error(`This happened: ${error}`));

//! Registring
fastify.register(cors);
fastify.register(routes, { prefix: "/api/v1/" });

//! Starting server
(() => {
  try {
    fastify.listen(
      { port: process.env.PORT || 8000, host: "0.0.0.0" },
      function (err, address) {
        if (err) {
          fastify.log.error(err);
          process.exit(1);
        }
        fastify.log.info(`Server is now listening on ${address}`);
      },
    );
  } catch (error) {
    fastify.log.error(error);
  }
})();
