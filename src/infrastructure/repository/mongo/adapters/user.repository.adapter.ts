import { GeneratedId } from "../../../../application/domain/generated-id";
import { User } from "../../../../application/domain/user";
import { UserRepositoryPort } from "../../../../application/ports/out/user.repository.port";
import { UsersCollection } from "../collections/users.collection";
import { GeneratedIdModelMapper } from "../mappers/generated-id.model.mapper";
import { UserMapperModel } from "../mappers/user.model.mapper";
import { UserDao } from "../models/user.dao";

export class UserRepositoryAdapter implements UserRepositoryPort {
  private usersCollection = new UsersCollection();

  private generatedIdModelMapper = new GeneratedIdModelMapper();
  private userModelMapper = new UserMapperModel();

  async save(user: User): Promise<GeneratedId> {
    const response = await this.usersCollection.save(user);
    return this.generatedIdModelMapper.toGeneratedId(response);
  }

  async find(): Promise<User[]> {
    const response: UserDao[] = await this.usersCollection.find();
    return this.userModelMapper.toUsers(response);
  }

  async findOneById(id: string): Promise<User> {
    const response: UserDao = await this.usersCollection.findOneById(id);
    return this.userModelMapper.toUser(response);
  }

  async findOneByEmail(email: string): Promise<User> {
    const response: UserDao = await this.usersCollection.findOneByEmail(email);
    return this.userModelMapper.toUser(response);
  }

  async deleteOneById(id: string): Promise<void> {
    await this.usersCollection.deleteOneById(id);
  }
}
