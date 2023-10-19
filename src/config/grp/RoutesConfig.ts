import {
    GrpMenusPathEnum,
    GrpModulesPathEnum,
    GrpSubMenusPathEnum,
} from "../../shared/enums/grp-menus.enum";
import { IGrpRoutesConfig } from "../../shared/interfaces/IGrpConfig";

import Login from "../../views/grp/login";
import Dashboard from "../../views/grp/dashboard";
import Access from "../../views/grp/access";
import Users from "../../views/grp/users";
import Roles from "../../views/grp/groups";
import layers from "../../views/grp/layers";
import layersStyles from "../../views/grp/layers-styles";
import layersGroups from "../../views/grp/layers-groups";
import logs from "../../views/grp/logs";
import projects from "../../views/grp/projects";

interface IRoutesConfig {
    public: IGrpRoutesConfig[];
    protected: {
        modules: IGrpRoutesConfig[];
        submenus: IGrpRoutesConfig[];
    };
}

export const RoutesConfig: IRoutesConfig = {
    public: [
        {
            element: Login,
            key: "login",
            path: "/grp/login",
        },
    ],
    protected: {
        modules: [
            {
                key: "home",
                path: GrpModulesPathEnum.HOME,
                element: Dashboard,
            },
            {
                key: "webgeo",
                path: GrpModulesPathEnum.WEBGEO,
            },
            {
                key: "gov-plan",
                path: GrpModulesPathEnum.GOV_PLAN,
                // element: GovPlansMenus,
            },
        ],
        submenus: [
            // acessos
            {
                key: "access",
                path: `${GrpModulesPathEnum.WEBGEO}/${GrpMenusPathEnum.WEBGEO_ACCESS}/${GrpSubMenusPathEnum.ACESSO_WEBGEO}`,
                element: Access,
            },
            {
                key: "users",
                path: `${GrpModulesPathEnum.WEBGEO}/${GrpMenusPathEnum.WEBGEO_ACCESS}/${GrpSubMenusPathEnum.USERS}`,
                element: Users,
            },
            {
                key: "roles",
                path: `${GrpModulesPathEnum.WEBGEO}/${GrpMenusPathEnum.WEBGEO_ACCESS}/${GrpSubMenusPathEnum.ROLES}`,
                element: Roles,
            },
            // camadas
            {
                key: "layers",
                path: `${GrpModulesPathEnum.WEBGEO}/${GrpMenusPathEnum.CONFIG_WEBGEO}/${GrpSubMenusPathEnum.LAYERS}`,
                element: layers,
            },
            {
                key: "layers-styles",
                path: `${GrpModulesPathEnum.WEBGEO}/${GrpMenusPathEnum.CONFIG_WEBGEO}/${GrpSubMenusPathEnum.LAYERS_STYLES}`,
                element: layersStyles,
            },
            {
                key: "layers-groups",
                path: `${GrpModulesPathEnum.WEBGEO}/${GrpMenusPathEnum.CONFIG_WEBGEO}/${GrpSubMenusPathEnum.LAYERS_GROUPS}`,
                element: layersGroups,
            },
            // logs
            {
                key: "logs",
                path: `${GrpModulesPathEnum.WEBGEO}/${GrpMenusPathEnum.WEBGEO_LOGS}/${GrpSubMenusPathEnum.LOGS}`,
                element: logs,
            },
            // {
            //     key: "goals",
            //     path: `${GrpModulesPathEnum.GOV_PLAN}/${GrpMenusPathEnum.GOV_GOALS}/${GrpSubMenusPathEnum.LIST_GOALS}`,
            //     element: Goals,
            // },
            // {
            //     key: "steps",
            //     path: `${GrpModulesPathEnum.GOV_PLAN}/${GrpMenusPathEnum.GOV_GOALS}/${GrpSubMenusPathEnum.STEPS}`,
            //     element: Steps,
            // },
            // {
            //     key: "secretaries",
            //     path: `${GrpModulesPathEnum.GOV_PLAN}/${GrpMenusPathEnum.GOV_GOALS}/${GrpSubMenusPathEnum.SECRETARIES}`,
            //     element: Secretaries,
            // },
            // projetos
            ...projects,
        ],
    },
};
