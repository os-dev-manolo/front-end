import { IProjectRepository } from "../interfaces/project.repository.interface";

export default (repository: IProjectRepository) => async () => {
    const projects = await repository.getAllProjects();

    return projects;
};
