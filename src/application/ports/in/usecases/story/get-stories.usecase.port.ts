import { Story } from "../../../../domain/story";

export interface GetStoriesUseCasePort {
  getStories(): Promise<Story[]>;
}
