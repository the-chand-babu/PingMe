import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  googelId: {
    type: String,
    required: true,
    unique: true,
  },
  photo: String,
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  email: {
    type: String,
    unique: true,
    require: true,
  },
  password: {
    require: true,
    type: Buffer,
  },
});

export const userModal = mongoose.model("user", userSchema);
