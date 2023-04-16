import { LastNew } from "../../../../domain/last-new";

export interface ModifyLastNewUseCasePort {
  modifyLastNew(id: string, lastNew: LastNew): Promise<void>;
}
