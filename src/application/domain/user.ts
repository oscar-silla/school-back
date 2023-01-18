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

  getId() {
    return this.id;
  }
  getUsername() {
    return this.username;
  }
  getPassword() {
    return this.password;
  }
  getName() {
    return this.name;
  }
  getEmail() {
    return this.email;
  }
  getSurnames() {
    return this.surnames;
  }
  getAvatar() {
    return this.avatar;
  }

  setId(id: string) {
    this.id = id;
  }
  setUsername(username: string) {
    this.username = username;
  }
  setPassword(password: string) {
    this.password = password;
  }
  setName(name: string) {
    this.name = name;
  }
  setEmail(email: string) {
    this.email = email;
  }
  setSurnames(surnames: string) {
    this.surnames = surnames;
  }
  setAvatar(avatar: string) {
    this.avatar = avatar;
  }
}
