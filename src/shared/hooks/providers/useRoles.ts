import { createContext, useContext } from "react";
import RolesComponent from "../../providers/roles";

const rolesContext = createContext(RolesComponent);

export const useRoles = () => useContext(rolesContext);
