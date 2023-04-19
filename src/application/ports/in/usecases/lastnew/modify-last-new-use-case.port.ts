import { LastNew } from "../../../../domain/last-new";

export interface ModifyLastNewUseCasePort {
  execute(id: string, lastNew: LastNew): Promise<void>;
}
