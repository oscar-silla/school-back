import { UserRepositoryAdapter } from "../../infrastructure/repository/mongo/adapters/user.repository.adapter";
import { GeneratedId } from "../domain/generated-id";
import { User } from "../domain/user";
import { UserServicePort } from "../ports/in/services/user.service.port";
import bcrypt from "bcrypt";
import { CustomError } from "../exceptions/CustomError";
import { HttpMessage } from "../domain/http-message";
import { HttpStatus } from "../domain/http-status";
import { UserRepositoryPort } from "../ports/out/user.repository.port";

export class UserService implements UserServicePort {
  private userRepository: UserRepositoryPort = new UserRepositoryAdapter();

  private async hashPassword(user: User): Promise<void> {
    user.setPassword(await bcrypt.hash(user.getPassword(), 10));
  }

  async createUser(user: User): Promise<GeneratedId> {
    const existsUser: User | null = await this.userRepository.findOneByEmail(
      user.getEmail()
    );
    this.throwConflictExceptionIfUserAlreadyExists(existsUser);
    await this.hashPassword(user);
    return await this.userRepository.save(user);
  }

  async getUserById(id: string): Promise<User> {
    const user: User | null = await this.userRepository.findOneById(id);
    this.throwExceptionIfNotFoundUser(user);
    return user!;
  }

  async getUserByEmail(email: string): Promise<User> {
    const user: User | null = await this.userRepository.findOneByEmail(email);
    this.throwExceptionIfNotFoundUser(user);
    return user!;
  }

  async getAllUsers(): Promise<User[]> {
    const users: User[] | null = await this.userRepository.find();
    this.throwExceptionIfNotFoundUser(users);
    return users!;
  }

  async deleteUser(id: string): Promise<void> {
    await this.getUserById(id);
    await this.userRepository.deleteOneById(id);
  }

  private throwConflictExceptionIfUserAlreadyExists(user: User | null): void {
    if (user) {
      throw new CustomError(HttpMessage.CONFLICT, HttpStatus.CONFLICT, {});
    }
  }

  private throwExceptionIfNotFoundUser(user: User | User[] | null): void {
    if (!user) {
      throw new CustomError(HttpMessage.NOT_FOUND, HttpStatus.NOT_FOUND, {});
    }
  }
}
