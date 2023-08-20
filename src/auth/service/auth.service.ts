import * as jwt from "jsonwebtoken";
import { generateHash, compareHash } from "../../../src/utils/handleBcrypt";
import { IAuth } from "../model/auth.model";
import UserModel from "../../user/model/user.model";
import { JWT_SECRET } from "../../config";

export class AuthService {
  constructor() {}

  async login(value: IAuth) {
    try {
      const user = await UserModel.findOne({ email: value.email });
      if (!user) {
        throw new Error("Usuario no encontrado");
      }
      const isPasswordValid = await compareHash(value.password, user.password);
      if (!isPasswordValid) {
        throw new Error("Contraseña incorrecta");
      }
      const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
        expiresIn: "10h",
      });
      return token;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async register(value: IAuth) {
    try {
      const newUser = new UserModel(value);
      newUser.password = await generateHash(value.password);
      return newUser.save();
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
