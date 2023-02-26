import { LastNew } from "../../../../domain/last-new";

export interface GetLastNewUseCasePort {
  getLastNew(id: string): Promise<LastNew>;
}
