interface IIssue {
    id: number;
    work: string;
    address?: {
        number: number;
        street: string;
        zipcode: string;
    };
    subject: string;
    secretary: string;
    cnpj: string;
    ressource: string;
    value: number;
    counterpartValue?: number;
    description: string;
    redmineId: number;
    createdby: {
        name: string;
        id: number;
    };
    type: string;
    startDate: Date;
    dueDate?: string;
    doneRatio: number;
    estimatedHours: number;
    updatedOn: Date;
    priority: string;
    status: string;
    attachments?: {
        filename: string;
        thumbnail?: string;
        downloadUrl: string;
        uploadedBy: string;
        description: string;
    }[];
    history?: {
        createdAt: Date;
        note?: string;
        details: {
            name: string;
            oldValue: string | null;
            newValue: string | null;
        }[];
    }[];
}

export interface IProjectIssue extends IIssue {
    childrens?: IIssue[];
}

export interface ICreateIssue {
    tracker: number;
    work: string;
    address: {
        number: number;
        street: string;
        zipcode: string;
    };
    secretary: string;
    cnpj: string;
    ressource: string;
    value: number;
    counterpartValue?: number;
    description: string;
    attachments?: { description: string; token: string }[];
}

export interface IUpdateIssue {
    work: string;
    address: {
        number: number;
        street: string;
        zipcode: string;
    };
    secretary: string;
    cnpj: string;
    ressource: string;
    value: number;
    description: string;
}
