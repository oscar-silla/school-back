import { User } from "../../../../application/domain/user";

export class UsersCollection {
  async save(user: User) {
    const { mongo } = global.database;
    return await mongo.collection("users").insertOne(user);
  }
}
