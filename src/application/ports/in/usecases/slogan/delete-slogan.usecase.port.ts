export interface DeleteSloganUseCasePort {
  execute(id: string): Promise<void>;
}
