import { Story } from "../../../../domain/story";

export interface ModifyStoryUseCasePort {
  modifyStory(id: string, story: Story): Promise<void>;
}
