export interface IAcls {
    functionalities: { id: number | string; label: string; name: string }[];
    sysAccess: {
        access: { id: number; label: string; name: string }[];
        functionalityId: number | string;
        functionalityLabel: string;
    }[];
}
