import ProjectsDatasource from "../datasource/projects.datasource";
import Project from "../entities/project.entity";
import {
    ICreateIssue,
    IProjectIssue,
    IUpdateIssue,
} from "../interfaces/IProjectIssue";
import { IProjectRepository } from "../interfaces/project.repository.interface";
import { IProjectsDatasource } from "../interfaces/projects.datasource.interface";

export default class ProjectsRepository implements IProjectRepository {
    private readonly datasource: IProjectsDatasource;

    constructor(datasource: IProjectsDatasource = new ProjectsDatasource()) {
        this.datasource = datasource;
    }

    // eslint-disable-next-line class-methods-use-this
    entity(project: IProjectIssue): Project {
        return new Project(project);
    }

    async getAllProjects(): Promise<Project[]> {
        const projects = await this.datasource.getAllProjects();

        return projects.map((project) => new Project(project));
    }

    async getProject(id: number): Promise<Project> {
        const project = await this.datasource.getProject(id);

        return new Project(project);
    }

    async create(data: ICreateIssue): Promise<Project> {
        const project = await this.datasource.createProject(data);

        return new Project(project);
    }

    async update(id: number, data: IUpdateIssue): Promise<void> {
        await this.datasource.updateProject(id, data);
    }
}
