import Project from "../entities/project.entity";
import { ICreateIssue, IProjectIssue, IUpdateIssue } from "./IProjectIssue";

export interface IProjectRepository {
    entity(project: Partial<IProjectIssue>): Project;
    getAllProjects(): Promise<Project[]>;
    getProject(id: number): Promise<Project>;
    create(data: ICreateIssue): Promise<Project>;
    update(id: number, data: IUpdateIssue): Promise<void>;
}
