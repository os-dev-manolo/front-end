import { IProjectRepository } from "../interfaces/project.repository.interface";

export default (repository: IProjectRepository) => async (id: number) => {
    const project = await repository.getProject(id);

    project.history = project.history?.sort(
        (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return project;
};
