import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    googleId: { type: String, required: true, unique: true },
    name: { type: String },
    email: { type: String, required: true, unique: true },
    avatar: { type: String },
  },
  { timestamps: true }
)

export default mongoose.model("UserModel", userSchema);