import { HttpStatus } from "../../domain/http-status";
import { HttpMessage } from "../../domain/http-message";
import { User } from "../../domain/user";
import { CustomError } from "../../exceptions/CustomError";
import { GetUserUseCasePort } from "../../ports/in/usecases/user/get-user.usecase.port";
import { UserService } from "../../services/user.service";
import { checkObjectId } from "../../utils/check-objectid.util";

export class GetUserUseCase implements GetUserUseCasePort {
  private userService = new UserService();

  private checkPathParams(id: string) {
    if (!id || !checkObjectId(id)) {
      throw new CustomError(HttpMessage.MISSING_PARAMS, HttpStatus.BAD_REQUEST);
    }
  }

  async getUser(id: string): Promise<User> {
    this.checkPathParams(id);
    return await this.userService.getUserById(id);
  }
}
