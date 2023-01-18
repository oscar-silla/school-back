import { GeneratedId } from "../../domain/generated-id";
import { HttpCode } from "../../domain/http-code";
import { HttpMessage } from "../../domain/http-message";
import { User } from "../../domain/user";
import { CustomError } from "../../exceptions/CustomError";
import { CreateUserUseCasePort } from "../../ports/in/usecases/user/create-user.usecase.port";
import { UserService } from "../../services/user.service";

export class CreateUserUseCase implements CreateUserUseCasePort {
  private userService = new UserService();

  private checkBodyParams(user: User) {
    if (
      !user.getUsername() ||
      !user.getPassword() ||
      !user.getName() ||
      !user.getEmail()
    ) {
      throw new CustomError(
        HttpMessage.MISSING_PARAMS,
        HttpCode.BAD_REQUEST,
        {}
      );
    }
  }

  async createUser(user: User): Promise<GeneratedId> {
    this.checkBodyParams(user);
    return await this.userService.createUser(user);
  }
}
