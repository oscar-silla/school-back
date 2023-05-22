import { UserModel } from "../models/user.model";
import { GeneratedIdModel } from "../models/generated-id.model";
import { GeneratedIdModelMapper } from "../mappers/generated-id.model.mapper";
import { UserModelMapper } from "../mappers/user.model.mapper";
import { UsersCollectionPort } from "../../../../application/ports/out/collection/users.collection.port";

export class UsersCollection implements UsersCollectionPort {
  private userModelMapper: UserModelMapper = new UserModelMapper();
  private generatedIdModelMapper: GeneratedIdModelMapper =
    new GeneratedIdModelMapper();
  async save(userModel: UserModel): Promise<GeneratedIdModel> {
    const { mongo } = global.database;
    return this.generatedIdModelMapper.toGenerateIdModel(
      await mongo.collection("users").insertOne(userModel)
    );
  }
  async findOneById(id: string): Promise<UserModel | null> {
    const { ObjectId, mongo } = global.database;
    return this.userModelMapper.toUserModel(
      await mongo.collection("users").findOne({ _id: ObjectId(id) })
    );
  }
  async findOneByEmail(email: string): Promise<UserModel | null> {
    const { mongo } = global.database;
    return this.userModelMapper.toUserModel(
      await mongo.collection("users").findOne({ email })
    );
  }
  async find(): Promise<UserModel[] | null> {
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
