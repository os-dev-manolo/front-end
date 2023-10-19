import { ProjectHistoryDetailEnum } from "../enums/project-history.enum";
import { IProjectIssue } from "../interfaces/IProjectIssue";

export default class Project {
    id?: number;

    work?: string;

    subject?: string;

    address?: IProjectIssue["address"];

    secretary?: string;

    cnpj?: string;

    ressource?: string;

    value?: number;

    counterpartValue?: number;

    description?: string;

    redmineId?: number;

    createdby?: {
        name: string;
        id: number;
    };

    type?: string;

    startDate?: Date;

    dueDate?: string;

    doneRatio?: number;

    estimatedHours?: number;

    updatedOn?: Date;

    priority?: string;

    status?: string;

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
            name: ProjectHistoryDetailEnum;
            oldValue: string | null;
            newValue: string | null;
            action: "insert" | "delete" | "update";
        }[];
    }[];

    childrens?: Project[];

    constructor(data: Partial<IProjectIssue>) {
        this.id = data.id;
        this.work = data.work;
        this.address = data.address;
        this.secretary = data.secretary;
        this.subject = data.subject;
        this.dueDate = data.dueDate;
        this.cnpj = data.cnpj;
        this.ressource = data.ressource;
        this.value = data.value;
        this.counterpartValue = data.counterpartValue;
        this.description = data.description;
        this.redmineId = data.redmineId;
        this.createdby = data.createdby;
        this.type = data.type;
        this.startDate = data.startDate;
        this.doneRatio = data.doneRatio;
        this.estimatedHours = data.estimatedHours;
        this.updatedOn = data.updatedOn;
        this.priority = data.priority;
        this.status = data.status;
        this.attachments = data.attachments;
        this.history = data.history?.map((hist) => ({
            createdAt: hist.createdAt,
            get details() {
                const validDetails = Object.values(ProjectHistoryDetailEnum);

                return hist.details
                    .filter((detail) =>
                        validDetails.includes(
                            detail.name as ProjectHistoryDetailEnum
                        )
                    )
                    .map((detail) => ({
                        ...detail,
                        name: detail.name as ProjectHistoryDetailEnum,
                        get action() {
                            if (detail.newValue && !detail.oldValue) {
                                return "insert";
                            }

                            if (detail.newValue && detail.oldValue) {
                                return "update";
                            }

                            return "delete";
                        },
                    }));
            },
            note: hist.note,
        }));
        this.childrens = data.childrens?.map((child) => new Project(child));
    }

    get schedule(): "expired" | "onTime" {
        if (!this.dueDate) return "onTime";

        return new Date() > new Date(this.dueDate) ? "expired" : "onTime";
    }

    get inlineAddress(): string {
        if (!this.address) return "";

        return `${this.address.street}, ${this.address.number} - ${this.address.zipcode}`;
    }
}
