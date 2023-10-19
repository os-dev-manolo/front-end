import { FaBook, FaCogs, FaLayerGroup } from "react-icons/fa";
import { TbLockAccess } from "react-icons/tb";
import { FiUsers, FiUser } from "react-icons/fi";
import { FeaturesEnum } from "../../shared/enums/features.enum";

import {
    GrpMenusPathEnum,
    GrpModulesPathEnum,
    GrpSubMenusPathEnum,
} from "../../shared/enums/grp-menus.enum";
import { IGrpMenusConfig } from "../../shared/interfaces/IGrpConfig";

export const MenusConfig = [
    {
        description: "Usuários e restrições",
        icon: TbLockAccess,
        key: "user-access",
        module: GrpModulesPathEnum.WEBGEO,
        submenus: [
            {
                description: "Acessos",
                icon: TbLockAccess,
                navigate: `${GrpMenusPathEnum.WEBGEO_ACCESS}/${GrpSubMenusPathEnum.ACESSO_WEBGEO}`,
                feature: FeaturesEnum.PERMISSIONS,
            },
            {
                description: "Usuários",
                icon: FiUser,
                navigate: `${GrpMenusPathEnum.WEBGEO_ACCESS}/${GrpSubMenusPathEnum.USERS}`,
                feature: FeaturesEnum.USERS_MANAGER,
            },
            {
                description: "Grupos",
                icon: FiUsers,
                navigate: `${GrpMenusPathEnum.WEBGEO_ACCESS}/${GrpSubMenusPathEnum.ROLES}`,
                feature: FeaturesEnum.ROLES,
            },
        ],
    },
    {
        description: "Configurações webgeo",
        icon: FaCogs,
        key: "webgeo-config",
        module: GrpModulesPathEnum.WEBGEO,
        submenus: [
            {
                description: "Camadas",
                icon: FaLayerGroup,
                navigate: `${GrpMenusPathEnum.CONFIG_WEBGEO}/${GrpSubMenusPathEnum.LAYERS}`,
                feature: FeaturesEnum.LAYERS_MANAGER,
            },
            {
                description: "Grupos de camadas",
                icon: FaLayerGroup,
                navigate: `${GrpMenusPathEnum.CONFIG_WEBGEO}/${GrpSubMenusPathEnum.LAYERS_GROUPS}`,
                feature: FeaturesEnum.LAYERS_GROUPS,
            },
            {
                description: "Estilos de camadas",
                icon: FaLayerGroup,
                navigate: `${GrpMenusPathEnum.CONFIG_WEBGEO}/${GrpSubMenusPathEnum.LAYERS_STYLES}`,
                feature: FeaturesEnum.LAYERS_STYLES,
            },
        ],
    },
    {
        description: "Logs",
        key: "logs",
        icon: FaBook,
        module: GrpModulesPathEnum.WEBGEO,
        submenus: [
            {
                description: "Logs de acesso",
                icon: FaBook,
                navigate: `${GrpMenusPathEnum.WEBGEO_LOGS}/${GrpSubMenusPathEnum.LOGS}`,
                feature: FeaturesEnum.LOGS,
            },
        ],
    },
    // {
    //     description: "Metas",
    //     key: "menu-goals",
    //     icon: GrProjects,
    //     module: GrpModulesPathEnum.GOV_PLAN,
    //     submenus: [
    //         {
    //             description: "Listar Metas",
    //             icon: GrProjects,
    //             navigate: `${GrpMenusPathEnum.GOV_GOALS}/${GrpSubMenusPathEnum.LIST_GOALS}`,
    //             feature: FeaturesEnum.LIST_GOALS,
    //         },
    //     ],
    // },
    // {
    //     description: "Etapas",
    //     key: "menu-steps",
    //     icon: AiOutlinePartition,
    //     module: GrpModulesPathEnum.GOV_PLAN,
    //     submenus: [
    //         {
    //             description: "Listar Etapas",
    //             icon: AiOutlinePartition,
    //             navigate: `${GrpMenusPathEnum.GOV_GOALS}/${GrpSubMenusPathEnum.STEPS}`,
    //             feature: FeaturesEnum.STEPS,
    //         },
    //     ],
    // },
    // {
    //     description: "Secretarias",
    //     key: "menu-secretaries",
    //     icon: FaList,
    //     module: GrpModulesPathEnum.GOV_PLAN,
    //     submenus: [
    //         {
    //             description: "Listar Secretarias",
    //             icon: FaList,
    //             navigate: `${GrpMenusPathEnum.GOV_GOALS}/${GrpSubMenusPathEnum.SECRETARIES}`,
    //             feature: FeaturesEnum.SECRETARIES,
    //         },
    //     ],
    // },
] as IGrpMenusConfig[];
