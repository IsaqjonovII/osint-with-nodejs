const User = require("../models");

const { handleError } = require("../utils");

async function uploadData(req, reply) {
  try {
    const data = req.body;
    const users = data.map((user) => new User(user));
    await User.insertMany(users);

    return reply.status(201).send({
      message: "User created and stored",
    });
  } catch (error) {
    handleError(error, reply);
  }
}

async function search(req, reply) {
  try {
    const { text } = req.query;

    const results = await User.find({
      $or: [
        { name: { $regex: new RegExp(text, "i") } },
        { email: { $regex: new RegExp(text, "i") } },
        { phone: { $regex: new RegExp(text, "i") } },
      ],
    }).lean();

    if (!results.length) {
      return reply.status(200).send({
        message: "Biz hech qanday malumot topa olmadik",
        results,
      });
    } else {
      return reply.send({ results });
    }
  } catch (error) {
    handleError(error, reply);
  }
}

module.exports = {
  uploadData,
  search,
};
