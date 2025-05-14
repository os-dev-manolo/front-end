import { IUser } from "./IUser";

export interface ILogsResponse {
    id: number;
    log_message: string;
    usr_ip: string;
    usr_id: number;
    system: "gbp";
    created_at: Date;
    updated_at: Date;
    user?: IUser;
}
