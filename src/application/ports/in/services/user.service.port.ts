import { GeneratedId } from "../../../domain/generated-id";
import { User } from "../../../domain/user";

export interface UserServicePort {
  createUser(user: User): Promise<GeneratedId>;
  getUserById(id: string): Promise<User>;
  getAllUsers(): Promise<User[]>;
  deleteUser(id: string): Promise<void>;
  getUserByEmail(email: string): Promise<User>;
}
