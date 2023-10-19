import {
    GbpModulesPathEnum,
    GbpMenusPathEnum,
    GbpSubMenusPathEnum,
} from "../../shared/enums/gbp-menus.enum";
import { IGbpRoutesConfig } from "../../shared/interfaces/IGbpConfig";

import Login from "../../views/gbp/login";
import Dashboard from "../../views/gbp/dashboard";
import { CompleteRegister, SimplifiedRegister } from "../../views/gbp/register";
import { Appointment } from "../../views/gbp/appointments";
import { Agenda } from "../../views/gbp/agenda";

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
                element: SimplifiedRegister,
            },
            {
                key: "complete-register-pf",
                path: `${GbpModulesPathEnum.REGISTER}/${GbpMenusPathEnum.GBP_REGISTER_PF}/${GbpSubMenusPathEnum.COMPLETE}`,
                element: CompleteRegister,
            },
            {
                key: "simple-register-pj",
                path: `${GbpModulesPathEnum.REGISTER}/${GbpMenusPathEnum.GBP_REGISTER_PJ}/${GbpSubMenusPathEnum.SIMPLE}`,
                element: SimplifiedRegister,
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
        ],
    },
};
