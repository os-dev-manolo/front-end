import TrackersDatasource from "../datasource/trackers.datasource";
import Tracker from "../entities/tracker.entity";
import { ITrackersDatasource } from "../interfaces/trackers.datasource.interface";
import { ITrackersRepository } from "../interfaces/trackers.repository.interface";

export default class TrackersRepository implements ITrackersRepository {
    private readonly datasource: ITrackersDatasource;

    constructor(datasource: ITrackersDatasource = new TrackersDatasource()) {
        this.datasource = datasource;
    }

    async getAll(): Promise<Tracker[]> {
        const trackers = await this.datasource.getAll();

        return trackers.map((tracker) => new Tracker(tracker));
    }
}
