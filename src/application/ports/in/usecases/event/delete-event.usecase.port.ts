export interface DeleteEventUseCasePort {
  deleteEvent(id: string): Promise<void>;
}