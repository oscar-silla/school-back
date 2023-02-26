import { GeneratedId } from "../../../domain/generated-id";
import { LastNew } from "../../../domain/last-new";

export interface LastNewServicePort {
  createLastNew(lastNew: LastNew): Promise<GeneratedId>;

  getLastNews(limit: number, page: number): Promise<LastNew[]>;

  getLastNew(id: string): Promise<LastNew>;

  modifyLastNew(id: string, lastNew: LastNew): Promise<void>;

  deleteLastNew(id: string): Promise<void>;
}
