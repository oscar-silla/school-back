export class User {
  private id?: string;
  private username: string;
  private password: string;
  private name: string;
  private email: string;
  private surnames: string;
  private avatar: string;

  constructor(
    _id?: string,
    username?: string,
    password?: string,
    name?: string,
    email?: string,
    surnames?: string,
    avatar?: string
  ) {
    this.username = username ? username : "";
    this.password = password ? password : "";
    this.name = name ? name : "";
    this.email = email ? email : "";
    this.surnames = surnames ? surnames : "";
    this.avatar = avatar ? avatar : "";
  }

  getId(): string | undefined {
    return this.id;
  }
  getUsername(): string {
    return this.username;
  }
  getPassword(): string {
    return this.password;
  }
  getName(): string {
    return this.name;
  }
  getEmail(): string {
    return this.email;
  }
  getSurnames(): string {
    return this.surnames;
  }
  getAvatar(): string {
    return this.avatar;
  }

  setId(id: string): void {
    this.id = id;
  }
  setUsername(username: string): void {
    this.username = username;
  }
  setPassword(password: string): void {
    this.password = password;
  }
  setName(name: string): void {
    this.name = name;
  }
  setEmail(email: string): void {
    this.email = email;
  }
  setSurnames(surnames: string): void {
    this.surnames = surnames;
  }
  setAvatar(avatar: string): void {
    this.avatar = avatar;
  }
}
