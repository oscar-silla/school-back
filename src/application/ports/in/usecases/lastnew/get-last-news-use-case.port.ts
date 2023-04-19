import { LastNew } from "../../../../domain/last-new";

export interface GetLastNewsUseCasePort {
  execute(limit: number, page: number): Promise<LastNew[]>;
}
