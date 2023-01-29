export interface DeleteVideoUseCasePort {
  deleteVideo(id: string): Promise<void>;
}
