import { GeneratedId } from "../../../domain/generated-id";
import { User } from "../../../domain/user";

export interface UserServicePort {
  createUser(user: User): Promise<GeneratedId>;
}
