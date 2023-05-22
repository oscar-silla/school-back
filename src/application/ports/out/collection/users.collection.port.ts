import { UserModel } from "../../../../infrastructure/repository/mongo/models/user.model";
import { GeneratedIdModel } from "../../../../infrastructure/repository/mongo/models/generated-id.model";

export interface UsersCollectionPort {
  save(userModel: UserModel): Promise<GeneratedIdModel>;
  findOneById(id: string): Promise<UserModel | null>;
  findOneByEmail(email: string): Promise<UserModel | null>;
  find(): Promise<UserModel[] | null>;
  deleteOneById(id: string): Promise<void>;
}
