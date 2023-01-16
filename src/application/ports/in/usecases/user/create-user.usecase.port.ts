import { GeneratedId } from "../../../../domain/generated-id";
import { User } from "../../../../domain/user";

export interface CreateUserUseCasePort {
  createUser(user: User): Promise<GeneratedId>;
}
