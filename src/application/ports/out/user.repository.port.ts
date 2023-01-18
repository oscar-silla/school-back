import { GeneratedId } from "../../domain/generated-id";
import { User } from "../../domain/user";

export interface UserRepositoryPort {
  save(user: User): Promise<GeneratedId>;
  findOneById(id: string): Promise<User>;
  findOneByEmail(username: string): Promise<User>;
  find(): Promise<User[]>;
  deleteOneById(id: string): Promise<void>;
}
