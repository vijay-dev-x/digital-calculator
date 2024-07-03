const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    whatsapp: { type: String, required: true },
    course: { type: String, required: true },
    status: { type: String },
    stage: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("userDetail", UserSchema);
