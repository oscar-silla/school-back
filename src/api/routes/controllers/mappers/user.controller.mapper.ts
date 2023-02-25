import {UserBody} from "../../../../../external-libraries/openapi/models/UserBody";
import {UserResponse} from "../../../../../external-libraries/openapi/models/UserResponse";
import {User} from "../../../../application/domain/user";

export class UserControllerMapper {
    toUser(userBody: UserBody): User {
        const {username, password, name, email, surnames, avatar} =
        userBody ?? {};
        const user = new User();
        user.setUsername(username);
        user.setPassword(password);
        user.setName(name);
        user.setEmail(email);
        user.setSurnames(surnames ? surnames : "");
        user.setAvatar(avatar ? avatar : "");
        return user;
    }

    toUserResponse(user: User): UserResponse {
        const userResponse = new UserResponse();
        userResponse.id = user.getId();
        userResponse.username = user.getUsername();
        userResponse.password = user.getPassword();
        userResponse.name = user.getName();
        userResponse.email = user.getEmail();
        userResponse.surnames = user.getSurnames();
        userResponse.avatar = user.getAvatar();
        return userResponse;
    }

    toUsersResponse(users: User[]): UserResponse[] {
        return users.map((user) => this.toUserResponse(user));
    }
}
