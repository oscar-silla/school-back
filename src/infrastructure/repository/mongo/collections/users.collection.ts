import { User } from "../../../../application/domain/user";
import { UserModel } from "../models/user.model";

export class UsersCollection {
  async save(user: User) {
    const { mongo } = global.database;
    return await mongo.collection("users").insertOne(user);
  }
  async findOneById(userId: string) {
    const { ObjectId, mongo } = global.database;
    return await mongo.collection("users").findOne({ _id: ObjectId(userId) });
  }
  async findOneByEmail(email: string) {
    const { mongo } = global.database;
    return await mongo.collection("users").findOne({ email });
  }
  async find(): Promise<UserModel[]> {
    const { mongo } = global.database;
    return await mongo.collection("users").find().toArray();
  }
  async deleteOneById(id: string): Promise<void> {
    const { ObjectId, mongo } = global.database;
    await mongo.collection("users").deleteOne({ _id: ObjectId(id) });
  }
}