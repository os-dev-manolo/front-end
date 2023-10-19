import { AxiosInstance } from "axios";
import { semvApi } from "../../../services/axios/apis.service";
import { ITrackersDatasource } from "../interfaces/trackers.datasource.interface";
import { ITracker } from "../interfaces/tracker.interface";

export default class TrackersDatasource implements ITrackersDatasource {
    private readonly api: AxiosInstance;

    constructor(api: AxiosInstance = semvApi) {
        this.api = api;
    }

    async getAll(): Promise<ITracker[]> {
        const {
            data: { trackers },
        } = await this.api.get<{ trackers: ITracker[] }>("/projects/trackers");

        return trackers;
    }
}
