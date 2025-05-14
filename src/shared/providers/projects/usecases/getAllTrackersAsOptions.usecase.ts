import { ITrackersDatasource } from "../interfaces/trackers.datasource.interface";
import getAllTrackers from "./getAllTrackers.usecase";

export default (repository: ITrackersDatasource) => async () => {
    const trackers = await getAllTrackers(repository)();

    return trackers.map((tracker) => ({
        label: tracker.name,
        value: tracker.id,
    }));
};
