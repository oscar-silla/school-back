import { UserBody } from "../../../../../external-libraries/openapi/models/UserBody";
import { User } from "../../../../application/domain/user";

export class UserControllerMapper {
  toUser(user: UserBody) {
    const { username, password, name, email, surnames, avatar } = user ?? {};
    return new User(
      username ? username : "",
      password ? password : "",
      name ? name : "",
      email ? email : "",
      surnames ? surnames : "",
      avatar ? avatar : ""
    );
  }
}
