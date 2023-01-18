import { LoginCredentials } from "../../../domain/login-credentials";
import { Token } from "../../../domain/token";

export interface LoginServicePort {
  login(
    loginCredentials: LoginCredentials,
    passwordToCompare: string
  ): Promise<Token>;
}
