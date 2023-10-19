import { IGrpRoutesConfig } from "../../../shared/interfaces/IGrpConfig";
import ProjectDetails from "./pages/project-details";
import ProjectsList from "./pages/projects-list";

const pages: IGrpRoutesConfig[] = [
    {
        key: "projects",
        path: "projetos",
        element: ProjectsList,
    },
    {
        key: "projects-deatils",
        path: "projetos/:id",
        element: ProjectDetails,
    },
];

export default pages;
