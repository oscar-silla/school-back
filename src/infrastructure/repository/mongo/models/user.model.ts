export class UserModel {
  private _id?: string;
  private username!: string;
  private password!: string;
  private name!: string;
  private email!: string;
  private surnames?: string;
  private avatar?: string;

  getId(): string | undefined {
    return this._id;
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
  getSurnames(): string | undefined {
    return this.surnames;
  }
  getAvatar(): string | undefined {
    return this.avatar;
  }
  setId(_id: string): void {
    this._id = _id;
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
