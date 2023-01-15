import { User } from "../../../../application/domain/user";

export class UsersCollection {
  async save(user: User) {
    const { mongo } = global.database;
    return await mongo.collection("users").insertOne(user);
  }
  async findOne(id: string) {
    const { ObjectId, mongo } = global.database;
    return await mongo.collection("users").findOne({ _id: ObjectId(id) });
  }
}
