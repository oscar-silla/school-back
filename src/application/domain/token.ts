export class Token {
  private token: string;

  constructor(token: string) {
    this.token = token;
  }

  get(): string {
    return this.token;
  }
  set(token: string): void {
    this.token = token;
  }
}
