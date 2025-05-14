import { createContext, useContext } from "react";
import ProjectsComponent from "../../providers/projects";

const projectsContext = createContext(ProjectsComponent);

export const useProjects = () => useContext(projectsContext);
