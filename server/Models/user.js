const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  gender: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: Number, required: true },
  category: { type: String, required: true },
  Technology: [{ type: String }],
  profileImage: { type: String },
});

const userModel = mongoose.model("User", UserSchema);

module.exports = userModel;
