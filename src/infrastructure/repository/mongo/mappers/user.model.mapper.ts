import { User } from "../../../../application/domain/user";
import { UserModel } from "../models/user.model";
import { UserType } from "../types/user.type";

export class UserModelMapper {
  toUserModel(user: User | UserType): UserModel {
    const userModel: UserModel = new UserModel();
    if (user instanceof User) {
      userModel.setUsername(user?.getUsername() ?? "");
      userModel.setPassword(user?.getPassword() ?? "");
      userModel.setName(user?.getName() ?? "");
      userModel.setEmail(user?.getEmail() ?? "");
      userModel.setSurnames(user?.getSurnames() ?? "");
      userModel.setAvatar(user?.getAvatar() ?? "");
    } else {
      userModel.setId(user?._id ?? "");
      userModel.setUsername(user?.username ?? "");
      userModel.setPassword(user?.password ?? "");
      userModel.setName(user?.name ?? "");
      userModel.setEmail(user?.email ?? "");
      userModel.setSurnames(user?.surnames ?? "");
      userModel.setAvatar(user?.avatar ?? "");
    }
    return userModel;
  }
  toUserModels(users: User[] | UserType[]): UserModel[] {
    return users.map((user: User | UserType) => this.toUserModel(user));
  }
  toUser(userModel: UserModel): User {
    const user: User = new User();
    user.setId(userModel?.getId() ?? "");
    user.setUsername(userModel?.getUsername() ?? "");
    user.setPassword(userModel?.getPassword() ?? "");
    user.setName(userModel?.getName() ?? "");
    user.setEmail(userModel?.getEmail() ?? "");
    user.setSurnames(userModel?.getSurnames() ?? "");
    user.setAvatar(userModel?.getAvatar() ?? "");
    return user;
  }
  toUsers(userModels: UserModel[]): User[] {
    return userModels.map((userModel: UserModel) => this.toUser(userModel));
  }
}
