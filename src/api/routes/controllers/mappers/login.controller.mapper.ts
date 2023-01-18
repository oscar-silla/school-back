import { LoginBody } from "../../../../../external-libraries/openapi/models/LoginBody";
import { LoginResponse } from "../../../../../external-libraries/openapi/models/LoginResponse";
import { LoginCredentials } from "../../../../application/domain/login-credentials";

export class LoginControllerMapper {
  toLoginCredentials(loginBody: LoginBody): LoginCredentials {
    const { email, password } = loginBody ?? {};
    const loginCredentials = new LoginCredentials();
    loginCredentials.setEmail(email ? email : password);
    loginCredentials.setPassword(password ? password : "");
    return loginCredentials;
  }
  toLoginResponse(token: string): LoginResponse {
    const loginResponse: LoginResponse = new LoginResponse();
    loginResponse.token = token;
    return loginResponse;
  }
}
