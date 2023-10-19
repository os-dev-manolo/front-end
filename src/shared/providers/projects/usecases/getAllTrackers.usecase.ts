import { ITrackersRepository } from "../interfaces/trackers.repository.interface";

export default (respository: ITrackersRepository) => async () => {
    const trackers = await respository.getAll();

    return trackers;
};
