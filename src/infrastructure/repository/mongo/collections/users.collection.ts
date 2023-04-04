import { UserModel } from "../models/user.model";
import { GeneratedIdModel } from "../models/generated-id.model";
import { GeneratedIdModelMapper } from "../mappers/generated-id.model.mapper";
import { UserModelMapper } from "../mappers/user.model.mapper";

export class UsersCollection {
  private userModelMapper = new UserModelMapper();
  private generatedIdModelMapper = new GeneratedIdModelMapper();
  async save(userModel: UserModel): Promise<GeneratedIdModel> {
    const { mongo } = global.database;
    return this.generatedIdModelMapper.toGenerateIdModel(
      await mongo.collection("users").insertOne(userModel)
    );
  }
  async findOneById(id: string): Promise<UserModel> {
    const { ObjectId, mongo } = global.database;
    return this.userModelMapper.toUserModel(
      await mongo.collection("users").findOne({ _id: ObjectId(id) })
    );
  }
  async findOneByEmail(email: string): Promise<UserModel> {
    const { mongo } = global.database;
    return this.userModelMapper.toUserModel(
      await mongo.collection("users").findOne({ email })
    );
  }
  async find(): Promise<UserModel[]> {
    const { mongo } = global.database;
    return this.userModelMapper.toUserModels(
      await mongo.collection("users").find().toArray()
    );
  }
  async deleteOneById(id: string): Promise<void> {
    const { ObjectId, mongo } = global.database;
    await mongo.collection("users").deleteOne({ _id: ObjectId(id) });
  }
}
