import {
    FiUsers,
    FiUser,
    FiPlusSquare,
    FiCheck,
    FiPaperclip,
} from "react-icons/fi";
import {
    FaBuilding,
    FaCalendarAlt,
    FaCity,
    FaHandsHelping,
    FaNewspaper,
} from "react-icons/fa";
import { BsFillFileEarmarkPersonFill } from "react-icons/bs";
import {
    MdContactPhone,
    MdEmail,
    MdEvent,
    MdGroups,
    MdPictureAsPdf,
} from "react-icons/md";
import { GrGroup } from "react-icons/gr";
import { FeaturesEnum } from "../../shared/enums/features.enum";

import {
    GbpModulesPathEnum,
    GbpMenusPathEnum,
    GbpSubMenusPathEnum,
} from "../../shared/enums/gbp-menus.enum";
import { IGbpMenusConfig } from "../../shared/interfaces/IGbpConfig";

export const MenusConfigGbp = [
    {
        description: "Pessoa Física",
        icon: FiUsers,
        key: "person-register",
        module: GbpModulesPathEnum.REGISTER,
        submenus: [
            {
                description: "Simplificado",
                icon: FiUser,
                navigate: `${GbpMenusPathEnum.GBP_REGISTER_PF}/${GbpSubMenusPathEnum.SIMPLE}`,
                feature: FeaturesEnum.PERMISSIONS,
            },
            {
                description: "Completo",
                icon: BsFillFileEarmarkPersonFill,
                navigate: `${GbpMenusPathEnum.GBP_REGISTER_PF}/${GbpSubMenusPathEnum.COMPLETE}`,
                feature: FeaturesEnum.USERS_MANAGER,
            },
            {
                description: "Novo",
                icon: FiUser,
                navigate: `${GbpMenusPathEnum.GBP_REGISTER_PF}/${GbpSubMenusPathEnum.COMPLETE}/${GbpSubMenusPathEnum.NEW}`,
                feature: FeaturesEnum.PERMISSIONS,
            },
        ],
    },
    {
        description: "Pessoa Jurídica",
        icon: FaBuilding,
        key: "company-register",
        module: GbpModulesPathEnum.REGISTER,
        submenus: [
            {
                description: "Simpificado",
                icon: FiUser,
                navigate: `${GbpMenusPathEnum.GBP_REGISTER_PJ}/${GbpSubMenusPathEnum.SIMPLE}`,
                feature: FeaturesEnum.PERMISSIONS,
            },
            {
                description: "Completo",
                icon: BsFillFileEarmarkPersonFill,
                navigate: `${GbpMenusPathEnum.GBP_REGISTER_PJ}/${GbpSubMenusPathEnum.COMPLETE}`,
                feature: FeaturesEnum.USERS_MANAGER,
            },
        ],
    },

    {
        description: "Emendas",
        icon: FaNewspaper,
        key: "emenda-register",
        module: GbpModulesPathEnum.REGISTER,
        submenus: [
            {
                description: "Emenda",
                icon: FiPlusSquare,
                navigate: `${GbpMenusPathEnum.GBP_REGISTER_AMENDMENT}/${GbpSubMenusPathEnum.NEW}`,
                feature: FeaturesEnum.PERMISSIONS,
            },
            {
                description: "Emenda API",
                icon: FiPaperclip,
                navigate: `${GbpMenusPathEnum.GBP_REGISTER_AMENDMENT_API}/${GbpSubMenusPathEnum.AMENDMENT_API}`,
                feature: FeaturesEnum.PERMISSIONS,
            },
        ],
    },
    {
        description: "Ofícios",
        icon: MdPictureAsPdf,
        key: "oficios-register",
        module: GbpModulesPathEnum.REGISTER,
        submenus: [
            {
                description: "Novo",
                icon: FiPlusSquare,
                navigate: `${GbpMenusPathEnum.GBP_REGISTER_OFICIO}/${GbpSubMenusPathEnum.NEW}`,
                feature: FeaturesEnum.PERMISSIONS,
            },
            {
                description: "Resposta",
                icon: FiCheck,
                navigate: `${GbpMenusPathEnum.GBP_REGISTER_OFICIO}/${GbpSubMenusPathEnum.RETURN}`,
                feature: FeaturesEnum.PERMISSIONS,
            },
        ],
    },
    {
        description: "Política",
        icon: MdGroups,
        key: "politics-register",
        module: GbpModulesPathEnum.REGISTER,
        submenus: [
            {
                description: "Cargos Políticos",
                icon: GrGroup,
                navigate: `${GbpMenusPathEnum.GBP_REGISTER_POLITICS}/${GbpSubMenusPathEnum.OFFICIALS}`,
                feature: FeaturesEnum.PERMISSIONS,
            },
            {
                description: "Políticos",
                icon: GrGroup,
                navigate: `${GbpMenusPathEnum.GBP_REGISTER_POLITICS}/${GbpSubMenusPathEnum.POLITICS}`,
                feature: FeaturesEnum.PERMISSIONS,
            },
            {
                description: "Partidos",
                icon: GrGroup,
                navigate: `${GbpMenusPathEnum.GBP_REGISTER_POLITICS}/${GbpSubMenusPathEnum.POLITICAL_PARTIES}`,
                feature: FeaturesEnum.PERMISSIONS,
            },
            {
                description: "Correntes",
                icon: GrGroup,
                navigate: `${GbpMenusPathEnum.GBP_REGISTER_POLITICS}/${GbpSubMenusPathEnum.POLITICAL_CHAINS}`,
                feature: FeaturesEnum.PERMISSIONS,
            },
        ],
    },
    {
        description: "Atendimentos",
        icon: FaHandsHelping,
        key: "attend-register",
        module: GbpModulesPathEnum.REGISTER,
        submenus: [
            {
                description: "Novo",
                icon: FiPlusSquare,
                navigate: `${GbpMenusPathEnum.GBP_REGISTER_POLITICAL_CHAIN}/${GbpSubMenusPathEnum.NEW}`,
                feature: FeaturesEnum.PERMISSIONS,
            },
        ],
    },

    {
        description: "Compromissos",
        icon: FaCalendarAlt,
        key: "appointment-register",
        module: GbpModulesPathEnum.REGISTER,
        submenus: [
            {
                description: "Novo",
                icon: FiPlusSquare,
                navigate: `${GbpMenusPathEnum.GBP_REGISTER_APPOINTMENT}/${GbpSubMenusPathEnum.NEW}`,
                feature: FeaturesEnum.PERMISSIONS,
            },
        ],
    },
    {
        description: "Eventos",
        icon: MdEvent,
        key: "events-register",
        module: GbpModulesPathEnum.REGISTER,
        submenus: [
            {
                description: "Novo",
                icon: FiPlusSquare,
                navigate: `${GbpMenusPathEnum.GBP_REGISTER_POLITICAL_CHAIN}/${GbpSubMenusPathEnum.NEW}`,
                feature: FeaturesEnum.PERMISSIONS,
            },
        ],
    },
    {
        description: "Visitas Municipais",
        icon: FaCity,
        key: "visit-register",
        module: GbpModulesPathEnum.REGISTER,
        submenus: [
            {
                description: "Lista de Visitas",
                icon: FiPlusSquare,
                navigate: `${GbpMenusPathEnum.GBP_REGISTER_POLITICS}/${GbpSubMenusPathEnum.CITIES}`,
                feature: FeaturesEnum.PERMISSIONS,
            },
        ],
    },

    {
        description: "Agenda Telefônica",
        icon: MdContactPhone,
        key: "phone-number-register",
        module: GbpModulesPathEnum.REGISTER,
        submenus: [
            {
                description: "Adicionar",
                icon: FiPlusSquare,
                navigate: `${GbpMenusPathEnum.GBP_REGISTER_POLITICAL_CHAIN}/${GbpSubMenusPathEnum.NEW}`,
                feature: FeaturesEnum.PERMISSIONS,
            },
        ],
    },
    {
        description: "Contatos Email",
        icon: MdEmail,
        key: "email-register",
        module: GbpModulesPathEnum.REGISTER,
        submenus: [
            {
                description: "Adicionar",
                icon: FiPlusSquare,
                navigate: `${GbpMenusPathEnum.GBP_REGISTER_POLITICAL_CHAIN}/${GbpSubMenusPathEnum.NEW}`,
                feature: FeaturesEnum.PERMISSIONS,
            },
        ],
    },
] as IGbpMenusConfig[];
