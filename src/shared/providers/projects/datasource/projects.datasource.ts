import { AxiosInstance } from "axios";
import { semvApi } from "../../../services/axios/apis.service";
import {
    ICreateIssue,
    IProjectIssue,
    IUpdateIssue,
} from "../interfaces/IProjectIssue";
import { IProjectsDatasource } from "../interfaces/projects.datasource.interface";

export default class ProjectsDatasource implements IProjectsDatasource {
    private readonly api: AxiosInstance;

    constructor(api: AxiosInstance = semvApi) {
        this.api = api;
    }

    public async getAllProjects(): Promise<IProjectIssue[]> {
        const {
            data: { projects },
        } = await this.api.get<{ projects: IProjectIssue[] }>(
            "/projects/issues"
        );

        return projects;
    }

    public async getProject(id: number): Promise<IProjectIssue> {
        const {
            data: { project },
        } = await this.api.get<{ project: IProjectIssue }>(
            `/projects/issues/${id}`
        );

        return project;
    }

    public async createProject(data: ICreateIssue): Promise<IProjectIssue> {
        const {
            data: { project },
        } = await this.api.post<{ project: IProjectIssue }>(
            "/projects/issues",
            data
        );

        return project;
    }

    async updateProject(id: number, data: IUpdateIssue): Promise<void> {
        await this.api.put(`/projects/issues/${id}`, data);
    }
}
