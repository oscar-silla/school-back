import { GeneratedId } from "../../../../domain/generated-id";
import { Story } from "../../../../domain/story";

export interface CreateStoryUseCasePort {
  createStory(story: Story): Promise<GeneratedId>;
}
