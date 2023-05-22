import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { LoginCredentials } from "../domain/login-credentials";
import { Token } from "../domain/token";
import { LoginServicePort } from "../ports/in/services/login.service.port";
import { CustomError } from "../exceptions/CustomError";
import { HttpMessage } from "../domain/http-message";
import { HttpStatus } from "../domain/http-status";

export class LoginService implements LoginServicePort {
  private async checkPassword(password: string, passworToCompare: string) {
    const samePassword: boolean = await bcrypt.compare(
      password,
      passworToCompare
    );
    if (!samePassword) {
      throw new CustomError(
        HttpMessage.UNAUTHORIZED,
        HttpStatus.UNAUTHORIZED,
        {}
      );
    }
  }

  private generateToken(): Token {
    if (!process.env.SECRET) {
      throw new CustomError(
        HttpMessage.ENVIRONMENT_VAR_NOT_FOUND,
        HttpStatus.NOT_FOUND,
        {}
      );
    }
    const expirationTime: number = Math.floor(Date.now() / 1000) + 60 * 60;
    const payload = { exp: expirationTime };
    const token: string = jwt.sign(payload, process.env.SECRET);
    return new Token(token);
  }

  async login(
    loginCredentials: LoginCredentials,
    passwordToCompare: string
  ): Promise<Token> {
    await this.checkPassword(loginCredentials.getPassword(), passwordToCompare);
    return this.generateToken();
  }
}
