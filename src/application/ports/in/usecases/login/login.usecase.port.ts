import { LoginCredentials } from "../../../../domain/login-credentials";
import { Token } from "../../../../domain/token";

export interface LoginUseCasePort {
  login(loginCredentials: LoginCredentials): Promise<Token>;
}
