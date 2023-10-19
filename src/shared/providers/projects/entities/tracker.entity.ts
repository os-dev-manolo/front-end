import { ITracker } from "../interfaces/tracker.interface";

export default class Tracker {
    id: number;

    name: string;

    constructor(data: ITracker) {
        this.id = data.id;
        this.name = data.name;
    }
}
