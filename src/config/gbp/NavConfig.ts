import {
    FaHome,
    FaRegCalendarAlt,
    FaSearch,
    FaFolderPlus,
} from "react-icons/fa";
import { MdContacts } from "react-icons/md";
import { TbReportAnalytics } from "react-icons/tb";
import { GbpModulesPathEnum } from "../../shared/enums/gbp-menus.enum";
import { INavConfig } from "../../shared/interfaces/IGbpConfig";

export const NavConfigGbp = [
    {
        description: "INÍCIO",
        icon: FaHome,
        navigate: GbpModulesPathEnum.HOME,
    },
    {
        description: "AGENDA",
        icon: FaRegCalendarAlt,
        navigate: GbpModulesPathEnum.AGENDA,
    },
    {
        description: "CADASTRO",
        icon: FaFolderPlus,
        navigate: GbpModulesPathEnum.REGISTER,
    },
    {
        description: "CONSULTA",
        icon: FaSearch,
        navigate: GbpModulesPathEnum.SEARCH,
    },
    {
        description: "CONTATOS",
        icon: MdContacts,
        navigate: GbpModulesPathEnum.CONTACTS,
    },
    {
        description: "RELATÓRIOS",
        icon: TbReportAnalytics,
        navigate: GbpModulesPathEnum.REPORTS,
    },
] as INavConfig;
