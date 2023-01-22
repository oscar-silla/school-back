export class Token {
  private token: string;

  constructor(token: string) {
    this.token = token;
  }

  get() {
    return this.token;
  }
  set(token: string) {
    this.token = token;
  }
}
