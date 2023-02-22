import {Event} from "../../../../domain/event";

export interface GetEventUseCasePort {
    getEvent(id: string): Promise<Event>;
}