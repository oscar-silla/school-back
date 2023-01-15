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

  async findOne(id: string): Promise<User> {
    const response: UserModel = await this.usersCollection.findOne(id);
    const mo = this.userMapperModel.toUser(response);
    console.log(mo);
    return mo;
  }
}
