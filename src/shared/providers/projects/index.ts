import AttachmentsRepository from "./repositories/attachments.respository";
import ProjectsRepository from "./repositories/projects.repository";
import TrackersRepository from "./repositories/trackers.repository";
import createProjectUsecase from "./usecases/createProject.usecase";
import getAllProjectsUsecase from "./usecases/getAllProjects.usecase";
import getAllTrackersUsecase from "./usecases/getAllTrackers.usecase";
import getProjectUsecase from "./usecases/getProject.usecase";
import updateProjectUsecase from "./usecases/updateProject.usecase";
// import getAllTrackersAsOptionsUsecase from "./usecases/getAllTrackersAsOptions.usecase";

const projectsRepository = new ProjectsRepository();
const trackersRepository = new TrackersRepository();
const attachmentsRepository = new AttachmentsRepository();

const ProjectsProvider = {
    getAllProjects: getAllProjectsUsecase(projectsRepository),
    getAllTrackers: getAllTrackersUsecase(trackersRepository),
    getProject: getProjectUsecase(projectsRepository),
    createProject: createProjectUsecase(
        projectsRepository,
        attachmentsRepository
    ),
    updateProject: updateProjectUsecase(projectsRepository),
    // getAllTrackersAsOptionsUsecase:
    //     getAllTrackersAsOptionsUsecase(trackersRepository),
};

export default ProjectsProvider;
