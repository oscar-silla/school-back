import { LastNew } from "../../../../domain/last-new";

export interface GetLastNewsUseCasePort {
  getLastNews(limit: number, page: number): Promise<LastNew[]>;
}
