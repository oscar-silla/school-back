import { HttpCode } from "../../domain/HttpCode";

export interface IException {
  id?: string;
  httpCode: HttpCode;
  description: string;
  isOperational?: boolean;
}
