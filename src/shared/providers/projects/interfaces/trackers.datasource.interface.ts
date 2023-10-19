import { ITracker } from "./tracker.interface";

export interface ITrackersDatasource {
    getAll(): Promise<ITracker[]>;
}
