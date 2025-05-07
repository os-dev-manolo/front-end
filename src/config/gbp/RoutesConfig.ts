import {
    GbpModulesPathEnum,
    GbpMenusPathEnum,
    GbpSubMenusPathEnum,
} from "../../shared/enums/gbp-menus.enum";
import { IGbpRoutesConfig } from "../../shared/interfaces/IGbpConfig";

import Login from "../../views/gbp/login";
import Dashboard from "../../views/gbp/dashboard";
import { Appointment } from "../../views/gbp/appointments";
import { Agenda } from "../../views/gbp/agenda";
import amendments from "../../views/gbp/amendments";
import politicalChain from "../../views/gbp/political-chain";
import politicalParty from "../../views/gbp/political-party";
import { CompleteRegister, SimpleRegister } from "../../views/gbp/register";
import politics from "../../views/gbp/politics";
import officials from "../../views/gbp/officials";
import city from "../../views/gbp/city";

interface IRoutesConfig {
    public: IGbpRoutesConfig[];
    protected: {
        modules: IGbpRoutesConfig[];
        submenus: IGbpRoutesConfig[];
    };
}

export const RoutesConfigGbp: IRoutesConfig = {
    public: [
        {
            element: Login,
            key: "login",
            path: "/grp/login",
        },
        {
            key: "agenda",
            path: GbpModulesPathEnum.AGENDA,
            element: Agenda,
        },
    ],
    protected: {
        modules: [
            {
                key: "home",
                path: GbpModulesPathEnum.HOME,
                element: Dashboard,
            },
            {
                key: "agenda",
                path: GbpModulesPathEnum.AGENDA,
                element: Agenda,
            },
            {
                key: "cadastro",
                path: GbpModulesPathEnum.REGISTER,
            },
            {
                key: "consulta",
                path: GbpModulesPathEnum.SEARCH,
            },
            {
                key: "phone-list",
                path: GbpModulesPathEnum.CONTACTS,
            },
            {
                key: "report-list",
                path: GbpModulesPathEnum.REPORTS,
            },
        ],
        submenus: [
            {
                key: "simple-register-pf",
                path: `${GbpModulesPathEnum.REGISTER}/${GbpMenusPathEnum.GBP_REGISTER_PF}/${GbpSubMenusPathEnum.SIMPLE}`,
                element: SimpleRegister,
            },
            {
                key: "complete-register-pf",
                path: `${GbpModulesPathEnum.REGISTER}/${GbpMenusPathEnum.GBP_REGISTER_PF}/${GbpSubMenusPathEnum.COMPLETE}`,
                element: CompleteRegister,
            },
            {
                key: "simple-register-pj",
                path: `${GbpModulesPathEnum.REGISTER}/${GbpMenusPathEnum.GBP_REGISTER_PJ}/${GbpSubMenusPathEnum.SIMPLE}`,
                element: SimpleRegister,
            },
            {
                key: "complete-register-pj",
                path: `${GbpModulesPathEnum.REGISTER}/${GbpMenusPathEnum.GBP_REGISTER_PJ}/${GbpSubMenusPathEnum.COMPLETE}`,
                element: CompleteRegister,
            },
            {
                key: "complete-register-pj",
                path: `${GbpModulesPathEnum.REGISTER}/${GbpMenusPathEnum.GBP_REGISTER_APPOINTMENT}/${GbpSubMenusPathEnum.NEW}`,
                element: Appointment,
            },
            {
                key: "complete-register-amendment",
                path: `${GbpModulesPathEnum.REGISTER}/${GbpMenusPathEnum.GBP_REGISTER_AMENDMENT}/${GbpSubMenusPathEnum.NEW}`,
                element: amendments,
            },
            {
                key: "political-chains",
                path: `${GbpModulesPathEnum.REGISTER}/${GbpMenusPathEnum.GBP_REGISTER_POLITICS}/${GbpSubMenusPathEnum.POLITICAL_CHAINS}`,
                element: politicalChain,
            },
            {
                key: "political-parties",
                path: `${GbpModulesPathEnum.REGISTER}/${GbpMenusPathEnum.GBP_REGISTER_POLITICS}/${GbpSubMenusPathEnum.POLITICAL_PARTIES}`,
                element: politicalParty,
            },
            {
                key: "politics",
                path: `${GbpModulesPathEnum.REGISTER}/${GbpMenusPathEnum.GBP_REGISTER_POLITICS}/${GbpSubMenusPathEnum.POLITICS}`,
                element: politics,
            },
            {
                key: "officials",
                path: `${GbpModulesPathEnum.REGISTER}/${GbpMenusPathEnum.GBP_REGISTER_POLITICS}/${GbpSubMenusPathEnum.OFFICIALS}`,
                element: officials,
            },
            {
                key: "visit-cities",
                path: `${GbpModulesPathEnum.REGISTER}/${GbpMenusPathEnum.GBP_REGISTER_POLITICS}/${GbpSubMenusPathEnum.CITIES}`,
                element: city,
            },
        ],
    },
};
