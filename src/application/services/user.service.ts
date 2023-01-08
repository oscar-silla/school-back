import { UserRepositoryAdapter } from "../../infrastructure/repository/mongo/adapters/user.repository.adapter";
import { GeneratedId } from "../domain/generated-id";
import { User } from "../domain/user";
import { UserServicePort } from "../ports/in/services/user.service.port";
import bcrypt from "bcrypt";

export class UserService implements UserServicePort {
  private userRepository = new UserRepositoryAdapter();

  private async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  async createUser(user: User): Promise<GeneratedId> {
    const passwordHashed = await this.hashPassword(user.getPassword());
    user.setPassword(passwordHashed);
    return await this.userRepository.save(user);
  }
}
