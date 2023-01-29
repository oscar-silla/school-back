import { Story } from "../../../../application/domain/story";
import { StoryModel } from "../models/story.model";

export class StoryMapperModel {
  toStory(storyModel: StoryModel): Story {
    const story: Story = new Story();
    story.setId(storyModel?._id ?? "");
    story.setTitle(storyModel?.title ?? "");
    story.setDescription(storyModel?.description ?? "");
    story.setImg(storyModel?.img ?? "");
    story.setContent(storyModel?.content ?? "");
    return story;
  }
  toStories(storyModels: StoryModel[]): Story[] {
    return storyModels.map((storyModel) => this.toStory(storyModel));
  }
}
