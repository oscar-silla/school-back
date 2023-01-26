import { GeneratedId } from "../../domain/generated-id";
import { Story } from "../../domain/story";

export interface StoryRepositoryPort {
  save(story: Story): Promise<GeneratedId>;
}
