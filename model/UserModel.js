import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    id: {type: String, required: true, unique: true },
    name: String,
    email: { type: String, required: true, unique: true },
    avatar: String,
  },
  { timestamps: true }
)

export default mongoose.model("UserModel", userSchema);