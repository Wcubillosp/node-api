import { blob } from "stream/consumers";
import UserModel, { IUser } from "../model/user.model";

export class UserService {
  constructor() {}

  async profile(userId: string) {
    try {
      const user = await UserModel.findOne({ _id: userId });
      if (!user) {
        throw new Error("Usuario no encontrado");
      }
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async profileEdit(userId: string, updatedUserData: IUser) {
    try {
      const user = await UserModel.findOne({ _id: userId });
      if (!user) {
        throw new Error("Usuario no encontrado");
      }
      Object.assign(user, updatedUserData);
      await user.save();

      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // async profileEditPhoto(userId: string, photoBuffer: Buffer) {
  //   try {
  //     const user = await UserModel.findOne({ _id: userId });
  //     if (!user) {
  //       throw new Error("Usuario no encontrado");
  //     }
  //     user.image = photoBuffer;
  //     await user.save();
  //   } catch (error) {
  //     throw new Error(error.message);
  //   }
  // }
}
