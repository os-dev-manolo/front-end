import Tracker from "../entities/tracker.entity";

export interface ITrackersRepository {
    getAll(): Promise<Tracker[]>;
}
