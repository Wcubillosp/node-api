import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcrypt";

export interface IAuth {
  _id: any;
  name?: string;
  email: string;
  password: string;
}

const authSchema = new Schema(
  {
    name: { type: String, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

authSchema.methods.encryptPassword = async function (password: string) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

authSchema.methods.matchPassword = async function (password: string) {
  return bcrypt.compare(password, this.password);
};

export default mongoose.model("auth", authSchema);
