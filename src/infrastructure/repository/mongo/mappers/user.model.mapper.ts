import { User } from "../../../../application/domain/user";
import { UserModel } from "../models/user.model";
import { UserType } from "../types/user.type";

export class UserModelMapper {
  toUserModel(user: User | UserType | null): UserModel | null {
    const userModel: UserModel = new UserModel();
    if (user instanceof User) {
      userModel.setUsername(user.getUsername());
      userModel.setPassword(user.getPassword());
      userModel.setName(user.getName());
      userModel.setEmail(user.getEmail());
      userModel.setSurnames(user?.getSurnames() ?? "");
      userModel.setAvatar(user?.getAvatar() ?? "");
    } else if (user?._id) {
      userModel.setId(user._id);
      userModel.setUsername(user.username);
      userModel.setPassword(user.password);
      userModel.setName(user.name);
      userModel.setEmail(user.email);
      userModel.setSurnames(user?.surnames ?? "");
      userModel.setAvatar(user?.avatar ?? "");
    } else {
      return null;
    }
    return userModel;
  }
  toUserModels(users: User[] | UserType[]): UserModel[] | null {
    return users.length > 0
      ? users.map((user: User | UserType) => this.toUserModel(user)!)
      : null;
  }
  toUser(userModel: UserModel | null): User | null {
    if (!userModel) {
      return null;
    }
    const user: User = new User();
    user.setId(userModel.getId()!);
    user.setUsername(userModel.getUsername());
    user.setPassword(userModel.getPassword());
    user.setName(userModel.getName());
    user.setEmail(userModel.getEmail());
    user.setSurnames(userModel?.getSurnames() ?? "");
    user.setAvatar(userModel?.getAvatar() ?? "");
    return user;
  }
  toUsers(userModels: UserModel[] | null): User[] | null {
    return userModels && userModels.length > 0
      ? userModels.map((userModel: UserModel) => this.toUser(userModel)!)
      : null;
  }
}
