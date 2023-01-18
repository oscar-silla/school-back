import { UserRepositoryAdapter } from "../../infrastructure/repository/mongo/adapters/user.repository.adapter";
import { GeneratedId } from "../domain/generated-id";
import { User } from "../domain/user";
import { UserServicePort } from "../ports/in/services/user.service.port";
import bcrypt from "bcrypt";
import { CustomError } from "../exceptions/CustomError";
import { HttpMessage } from "../domain/http-message";
import { HttpCode } from "../domain/http-code";
import { UserRepositoryPort } from "../ports/out/user.repository.port";

export class UserService implements UserServicePort {
  private userRepository: UserRepositoryPort = new UserRepositoryAdapter();

  private async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  async createUser(user: User): Promise<GeneratedId> {
    await this.checkIfUserExists(user.getUsername());
    const passwordHashed = await this.hashPassword(user.getPassword());
    user.setPassword(passwordHashed);
    return await this.userRepository.save(user);
  }

  async getUser(id: string): Promise<User> {
    const user: User = await this.userRepository.findOneById(id);
    this.checkIfUserNotExists(user);
    return user;
  }

  async getAllUsers(): Promise<User[]> {
    const users: User[] = await this.userRepository.find();
    this.checkIfUserListIsEmpty(users);
    return users;
  }

  async deleteUser(id: string): Promise<void> {
    await this.getUser(id);
    await this.userRepository.deleteOneById(id);
  }

  private async checkIfUserExists(username: string) {
    const user: User = await this.userRepository.findOneByUserName(username);
    if (user.getId()) {
      throw new CustomError(HttpMessage.CONFLICT, HttpCode.CONFLICT, {});
    }
  }

  private checkIfUserNotExists(user: User) {
    if (!user.getId()) {
      throw new CustomError(HttpMessage.NOT_FOUND, HttpCode.NOT_FOUND, {});
    }
  }

  private checkIfUserListIsEmpty(users: User[]) {
    if (users.length === 0) {
      throw new CustomError(HttpMessage.NOT_FOUND, HttpCode.NOT_FOUND, {});
    }
  }
}
