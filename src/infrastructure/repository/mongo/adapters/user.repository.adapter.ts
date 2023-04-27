import { GeneratedId } from "../../../../application/domain/generated-id";
import { User } from "../../../../application/domain/user";
import { UserRepositoryPort } from "../../../../application/ports/out/user.repository.port";
import { UsersCollection } from "../collections/users.collection";
import { GeneratedIdModelMapper } from "../mappers/generated-id.model.mapper";
import { UserModelMapper } from "../mappers/user.model.mapper";
import { UserModel } from "../models/user.model";
import { GeneratedIdModel } from "../models/generated-id.model";

export class UserRepositoryAdapter implements UserRepositoryPort {
  private usersCollection = new UsersCollection();

  private userModelMapper: UserModelMapper = new UserModelMapper();
  private generatedIdModelMapper: GeneratedIdModelMapper =
    new GeneratedIdModelMapper();

  async save(user: User): Promise<GeneratedId> {
    const userModel: UserModel = this.userModelMapper.toUserModel(user)!;
    const response: GeneratedIdModel = await this.usersCollection.save(
      userModel
    );
    return this.generatedIdModelMapper.toGeneratedId(response);
  }

  async find(): Promise<User[] | null> {
    const response: UserModel[] | null = await this.usersCollection.find();
    return this.userModelMapper.toUsers(response);
  }

  async findOneById(id: string): Promise<User | null> {
    const response: UserModel | null = await this.usersCollection.findOneById(
      id
    );
    return this.userModelMapper.toUser(response);
  }

  async findOneByEmail(email: string): Promise<User | null> {
    const response: UserModel | null =
      await this.usersCollection.findOneByEmail(email);
    return this.userModelMapper.toUser(response);
  }

  async deleteOneById(id: string): Promise<void> {
    await this.usersCollection.deleteOneById(id);
  }
}
