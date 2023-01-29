export interface DeleteStoryUseCasePort {
  deleteStory(id: string): Promise<void>;
}
