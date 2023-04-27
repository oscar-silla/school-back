import { GeneratedId } from "../../domain/generated-id";
import { User } from "../../domain/user";

export interface UserRepositoryPort {
  save(user: User): Promise<GeneratedId>;
  findOneById(id: string): Promise<User | null>;
  findOneByEmail(username: string): Promise<User | null>;
  find(): Promise<User[] | null>;
  deleteOneById(id: string): Promise<void>;
}
