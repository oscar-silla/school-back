import { HttpCode } from "../../domain/http-code";
import { HttpMessage } from "../../domain/http-message";
import { LoginCredentials } from "../../domain/login-credentials";
import { Token } from "../../domain/token";
import { User } from "../../domain/user";
import { CustomError } from "../../exceptions/CustomError";
import { LoginServicePort } from "../../ports/in/services/login.service.port";
import { UserServicePort } from "../../ports/in/services/user.service.port";
import { LoginUseCasePort } from "../../ports/in/usecases/login/login.usecase.port";
import { LoginService } from "../../services/login.service";
import { UserService } from "../../services/user.service";

export class LoginUseCase implements LoginUseCasePort {
  private loginService: LoginServicePort = new LoginService();
  private userService: UserServicePort = new UserService();

  private checkBodyParams(loginCredentials: LoginCredentials) {
    if (!loginCredentials.getEmail() || !loginCredentials.getPassword()) {
      throw new CustomError(
        HttpMessage.MISSING_PARAMS,
        HttpCode.BAD_REQUEST,
        {}
      );
    }
  }

  private async getUserByEmail(email: string): Promise<User> {
    return await this.userService.getUserByEmail(email);
  }

  async login(loginCredentials: LoginCredentials): Promise<Token> {
    this.checkBodyParams(loginCredentials);
    const user: User = await this.getUserByEmail(loginCredentials.getEmail());
    return await this.loginService.login(loginCredentials, user.getPassword());
  }
}
