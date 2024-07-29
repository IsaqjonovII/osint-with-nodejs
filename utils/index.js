const handleError = (error, reply) => {
  return reply.status(500).send({ message: "we're done🔥", error });
};

module.exports = { handleError };
