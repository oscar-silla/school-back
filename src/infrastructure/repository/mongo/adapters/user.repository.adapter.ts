import { GeneratedId } from "../../../../application/domain/generated-id";
import { User } from "../../../../application/domain/user";
import { UserRepositoryPort } from "../../../../application/ports/out/user.repository.port";
import { UsersCollection } from "../collections/users.collection";
import { GeneratedIdMapperModel } from "../mappers/generated-id.mapper.model";

export class UserRepositoryAdapter implements UserRepositoryPort {
  private usersCollection = new UsersCollection();

  private generatedIdMapperModel = new GeneratedIdMapperModel();

  async save(user: User): Promise<GeneratedId> {
    const response = await this.usersCollection.save(user);
    return this.generatedIdMapperModel.toGeneratedId(response);
  }
}
