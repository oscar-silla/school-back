import { GeneratedId } from "../../../domain/generated-id";
import { Story } from "../../../domain/story";

export interface StoryServicePort {
  createStory(story: Story): Promise<GeneratedId>;
}
