import { StoryRepositoryAdapter } from "../../infrastructure/repository/mongo/adapters/story.repository.adapter";
import { GeneratedId } from "../domain/generated-id";
import { HttpCode } from "../domain/http-code";
import { HttpMessage } from "../domain/http-message";
import { Story } from "../domain/story";
import { CustomError } from "../exceptions/CustomError";
import { StoryServicePort } from "../ports/in/services/story.service.port";
import { StoryRepositoryPort } from "../ports/out/story.repository.port";

export class StoryService implements StoryServicePort {
  private storyRepository: StoryRepositoryPort = new StoryRepositoryAdapter();

  async createStory(story: Story): Promise<GeneratedId> {
    return await this.storyRepository.save(story);
  }

  async getStories(): Promise<Story[]> {
    const stories: Story[] = await this.storyRepository.find();
    console.log(stories);
    this.checkIfIsItAnEmptyStoryList(stories);
    return stories;
  }

  async getStory(id: string): Promise<Story> {
    const story: Story = await this.storyRepository.findOne(id);
    this.checkIfIsItAnEmptyStory(story);
    return story;
  }

  async modifyStory(id: string, story: Story): Promise<void> {
    const storyToModify: Story = await this.getStory(id);
    const payload: Story = this.buildPayloadToModifyStory(story, storyToModify);
    await this.storyRepository.modifyOne(id, payload);
  }

  async deleteStory(id: string): Promise<void> {
    await this.getStory(id);
    await this.storyRepository.deleteOne(id);
  }

  private buildPayloadToModifyStory(story: Story, storyToModify: Story): Story {
    const payload: Story = new Story();
    payload.setTitle(
      story.getTitle() ? story.getTitle() : storyToModify.getTitle()
    );
    payload.setDescription(
      story.getDescription()
        ? story.getDescription()
        : storyToModify.getDescription()
    );
    payload.setImg(story.getImg() ? story.getImg() : storyToModify.getImg());
    payload.setContent(
      story.getContent() ? story.getContent() : storyToModify.getContent()
    );
    return payload;
  }

  private checkIfIsItAnEmptyStory(story: Story): void {
    if (!story.getId()) {
      throw new CustomError(HttpMessage.NOT_FOUND, HttpCode.NOT_FOUND, {});
    }
  }
  private checkIfIsItAnEmptyStoryList(stories: Story[]): void {
    if (stories.length === 0) {
      throw new CustomError(HttpMessage.NOT_FOUND, HttpCode.NOT_FOUND, {});
    }
  }
}
