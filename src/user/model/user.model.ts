import mongoose, { Schema } from "mongoose";

export interface IUser {
  _id: any;
  name: string;
  email: string;
  password: string;
  image: string;
}

const userSchema = new Schema(
  {
    name: { type: String, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    description: { type: String, required: false },
    image: { type: String, required: false },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("user", userSchema);
