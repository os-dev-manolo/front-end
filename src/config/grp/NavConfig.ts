import { FaHome, FaGlobeAmericas } from "react-icons/fa";
import { GrpModulesPathEnum } from "../../shared/enums/grp-menus.enum";
import { INavConfig } from "../../shared/interfaces/IGrpConfig";

export const NavConfig = [
    {
        description: "INÍCIO",
        icon: FaHome,
        navigate: GrpModulesPathEnum.HOME,
    },
    {
        description: "WEBGEO",
        icon: FaGlobeAmericas,
        navigate: GrpModulesPathEnum.WEBGEO,
    },
    {
        description: "Projetos",
        icon: FaGlobeAmericas,
        navigate: GrpModulesPathEnum.PROJECTS,
    },
    // {
    //     description: "Plano de Gov",
    //     icon: GrPlan,
    //     navigate: GrpModulesPathEnum.GOV_PLAN,
    // },
] as INavConfig;
