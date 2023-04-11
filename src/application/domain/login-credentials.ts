export class LoginCredentials {
  private email: string;
  private password: string;

  constructor(email?: string, password?: string) {
    this.email = email ? email : "";
    this.password = password ? password : "";
  }

  getEmail(): string {
    return this.email;
  }
  getPassword(): string {
    return this.password;
  }

  setEmail(email: string): void {
    this.email = email;
  }
  setPassword(password: string): void {
    this.password = password;
  }
}
