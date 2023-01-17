import { HttpCode } from "../../domain/http-code";
import { HttpMessage } from "../../domain/http-message";
import { CustomError } from "../../exceptions/CustomError";
import { UserServicePort } from "../../ports/in/services/user.service.port";
import { DeleteUserUseCasePort } from "../../ports/in/usecases/user/delete-user.usecase.port";
import { UserService } from "../../services/user.service";
import { checkObjectId } from "../../utils/check-objectid.util";

export class DeleteUserUseCase implements DeleteUserUseCasePort {
  private userService: UserServicePort = new UserService();

  private checkPathParams(id: string) {
    if (!id || !checkObjectId(id)) {
      throw new CustomError(
        HttpMessage.MISSING_PARAMS,
        HttpCode.BAD_REQUEST,
        {}
      );
    }
  }

  async deleteUser(id: string): Promise<void> {
    this.checkPathParams(id);
    await this.userService.deleteUser(id);
  }
}
