import { SloganModel } from "../../../../infrastructure/repository/mongo/models/slogan.model";
import { GeneratedIdModel } from "../../../../infrastructure/repository/mongo/models/generated-id.model";

export interface SlogansCollectionPort {
  save(sloganDao: SloganModel): Promise<GeneratedIdModel>;
  findFirst(): Promise<SloganModel | null>;
  findById(id: string): Promise<SloganModel | null>;
  findByTitle(title: string): Promise<SloganModel | null>;
  modifyOneById(id: string, slogan: SloganModel): Promise<void>;
  deleteOneById(id: string): Promise<void>;
}
