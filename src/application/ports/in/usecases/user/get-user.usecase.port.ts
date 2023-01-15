import { User } from "../../../../domain/user";

export interface GetUserUseCasePort {
  getUser(id: string): Promise<User>;
}
