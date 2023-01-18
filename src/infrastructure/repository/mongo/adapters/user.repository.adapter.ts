import { GeneratedId } from "../../../../application/domain/generated-id";
import { User } from "../../../../application/domain/user";
import { UserRepositoryPort } from "../../../../application/ports/out/user.repository.port";
import { UsersCollection } from "../collections/users.collection";
import { GeneratedIdMapperModel } from "../mappers/generated-id.mapper.model";
import { UserMapperModel } from "../mappers/user.mapper.model";
import { UserModel } from "../models/user.model";

export class UserRepositoryAdapter implements UserRepositoryPort {
  private usersCollection = new UsersCollection();

  private generatedIdMapperModel = new GeneratedIdMapperModel();
  private userMapperModel = new UserMapperModel();

  async save(user: User): Promise<GeneratedId> {
    const response = await this.usersCollection.save(user);
    return this.generatedIdMapperModel.toGeneratedId(response);
  }

  async find(): Promise<User[]> {
    const response: UserModel[] = await this.usersCollection.find();
    return this.userMapperModel.toUsers(response);
  }

  async findOneById(id: string): Promise<User> {
    const response: UserModel = await this.usersCollection.findOneById(id);
    return this.userMapperModel.toUser(response);
  }

  async findOneByUserName(username: string): Promise<User> {
    const response: UserModel = await this.usersCollection.findOneByUsername(
      username
    );
    return this.userMapperModel.toUser(response);
  }

  async deleteOneById(id: string): Promise<void> {
    await this.usersCollection.deleteOneById(id);
  }
}
