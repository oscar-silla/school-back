import { User } from "../../domain/user";
import { UserServicePort } from "../../ports/in/services/user.service.port";
import { GetAllUsersUseCasePort } from "../../ports/in/usecases/user/get-all-users.usecase.port";
import { UserService } from "../../services/user.service";

export class GetAllUsersUseCase implements GetAllUsersUseCasePort {
  private userService: UserServicePort = new UserService();

  async getAllUsers(): Promise<User[]> {
    return await this.userService.getAllUsers();
  }
}
