import { GrpActionsEnum } from "../enums/grp-actions.enum";

export interface IGrpAccesses {
    id: number;
    sub_path: string;
    table: string;
    created_at: Date;
    updated_at: Date;
}

export interface ICreateGrpAcl {
    groupId: number;
    systemAccess: number[];
}

export interface IGroupAcl {
    grp_id: number;
    sub_id: number;
    crud: GrpActionsEnum;
}
