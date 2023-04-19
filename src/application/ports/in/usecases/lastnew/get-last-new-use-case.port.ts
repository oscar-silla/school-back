import { LastNew } from "../../../../domain/last-new";

export interface GetLastNewUseCasePort {
  execute(id: string): Promise<LastNew>;
}
