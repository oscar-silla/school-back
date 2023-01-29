import { Story } from "../../../../domain/story";

export interface GetStoryUseCasePort {
  getStory(id: string): Promise<Story>;
}
