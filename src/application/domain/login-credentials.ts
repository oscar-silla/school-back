export class LoginCredentials {
  private email: string;
  private password: string;

  constructor(email?: string, password?: string) {
    this.email = email ? email : "";
    this.password = password ? password : "";
  }

  getEmail() {
    return this.email;
  }
  getPassword() {
    return this.password;
  }

  setEmail(email: string) {
    this.email = email;
  }
  setPassword(password: string) {
    this.password = password;
  }
}
