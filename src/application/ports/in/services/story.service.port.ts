import { GeneratedId } from "../../../domain/generated-id";
import { Story } from "../../../domain/story";

export interface StoryServicePort {
  createStory(story: Story): Promise<GeneratedId>;
  getStories(): Promise<Story[]>;
  getStory(id: string): Promise<Story>;
  modifyStory(id: string, story: Story): Promise<void>;
  deleteStory(id: string): Promise<void>;
}
