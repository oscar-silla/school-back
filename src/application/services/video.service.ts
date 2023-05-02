import {VideoRepositoryAdapter} from "../../infrastructure/repository/mongo/adapters/video.repository.adapter";
import {GeneratedId} from "../domain/generated-id";
import {HttpStatus} from "../domain/http-status";
import {HttpMessage} from "../domain/http-message";
import {Video} from "../domain/video";
import {CustomError} from "../exceptions/CustomError";
import {VideoServicePort} from "../ports/in/services/video.service.port";
import {VideoRepositoryPort} from "../ports/out/video.repository.port";

export class VideoService implements VideoServicePort {
    videoRepositoryAdapter: VideoRepositoryPort = new VideoRepositoryAdapter();

    async createVideo(video: Video): Promise<GeneratedId> {
        return await this.videoRepositoryAdapter.save(video);
    }

    async modifyVideo(id: string, video: Video): Promise<void> {
        await this.getVideoById(id);
        await this.videoRepositoryAdapter.modify(id, video);
    }

    async getVideoByRef(ref: string): Promise<Video> {
        const video: Video | null = await this.videoRepositoryAdapter.getOneByRef(ref);
        this.throwExceptionIfNotFoundVideo(video);
        return video!;
    }

    async getVideoById(id: string): Promise<Video> {
        const video: Video | null = await this.videoRepositoryAdapter.getOneById(id);
        this.throwExceptionIfNotFoundVideo(video);
        return video!;
    }

    async deleteVideo(id: string): Promise<void> {
        await this.getVideoById(id);
        await this.videoRepositoryAdapter.deleteOne(id);
    }

    private throwExceptionIfNotFoundVideo(
        video: Video | null
    ): void {
        if (!video) {
            throw new CustomError(HttpMessage.NOT_FOUND, HttpStatus.NOT_FOUND, {});
        }
    }
}
