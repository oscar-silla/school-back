import { GeneratedId } from "../../domain/generated-id";
import { User } from "../../domain/user";

export interface UserRepositoryPort {
  save(user: User): Promise<GeneratedId>;
  findOneById(id: string): Promise<User>;
  findOneByUserName(username: string): Promise<User>;
  find(): Promise<User[]>;
}
