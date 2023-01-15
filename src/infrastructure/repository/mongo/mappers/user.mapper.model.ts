import { User } from "../../../../application/domain/user";
import { UserModel } from "../models/user.model";

export class UserMapperModel {
  toUser(userModel: UserModel): User {
    const user: User = new User();
    user.setId(userModel._id ? userModel._id : "");
    user.setUsername(userModel.username ? userModel.username : "");
    user.setPassword(userModel.password ? userModel.password : "");
    user.setName(userModel.name ? userModel.name : "");
    user.setEmail(userModel.email ? userModel.email : "");
    user.setSurnames(userModel.surnames ? userModel.surnames : "");
    user.setAvatar(userModel.avatar ? userModel.avatar : "");
    return user;
  }
}
