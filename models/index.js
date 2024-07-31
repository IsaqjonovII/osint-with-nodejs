const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  name: String,
  phone: String,
  email: String,
  card: {
    number: Number,
    cvv: Number,
    expirationDate: String,
  },
});

UserSchema.index({
  name: "text",
  phone: "text",
  email: "text",
});

const User = model("User", UserSchema);
module.exports = User;
