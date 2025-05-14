export interface IWebgeoAcl {
    id: number;
    fs_nome: string;
    systemAccess: {
        id: number;
        as_nome: string;
        ct_id: number;
        fs_id: number;
    }[];
}

export interface ICreateWebgeoAcl {
    groupId: number;
    systemAccess: number[];
    layersAccess: number[];
}

export interface IGroupAcl {
    systemAccess: {
        grp_id: number;
        as_id: number;
    }[];
    layersAccess: {
        grp_id: number;
        cam_id: number;
    }[];
}
