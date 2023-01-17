export interface DeleteUserUseCasePort {
  deleteUser(id: string): Promise<void>;
}
