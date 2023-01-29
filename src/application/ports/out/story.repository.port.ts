import { GeneratedId } from "../../domain/generated-id";
import { Story } from "../../domain/story";

export interface StoryRepositoryPort {
  save(story: Story): Promise<GeneratedId>;
  find(): Promise<Story[]>;
  findOne(id: string): Promise<Story>;
  modifyOne(id: string, story: Story): Promise<void>;
  deleteOne(id: string): Promise<void>;
}
