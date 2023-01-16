import { User } from "../../../../domain/user";

export interface GetAllUsersUseCasePort {
  getAllUsers(): Promise<User[]>;
}
