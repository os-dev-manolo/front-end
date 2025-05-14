import { ICreateIssue, IProjectIssue, IUpdateIssue } from "./IProjectIssue";

export interface IProjectsDatasource {
    getAllProjects(): Promise<IProjectIssue[]>;
    getProject(id: number): Promise<IProjectIssue>;
    createProject(data: ICreateIssue): Promise<IProjectIssue>;
    updateProject(id: number, data: IUpdateIssue): Promise<void>;
}
