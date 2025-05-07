/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-dynamic-require */

import WebgeoLogo from "./semv/webgeo.png";
import SemvIconLogo from "./semv/semv_icon.png";
import SemvLogo from "./semv/semv.png";
import CompanyLogo from "./company/logo.jpg";
import GabineteLogo from "./clients/pedro_lupion.png";
import PartidoLogo from "./clients/pp.png";
import environments from "../../../environments";

const ClientLogo = /https:\/\//.test(environments.client.logo)
    ? environments.client.logo
    : require(`./clients/${environments.client.logo}`);

const ClientBrasao = /https:\/\//.test(environments.client.brasao as string)
    ? environments.client.brasao
    : require(`./clients/${environments.client.brasao}`);

export {
    WebgeoLogo,
    SemvIconLogo,
    SemvLogo,
    ClientLogo,
    ClientBrasao,
    CompanyLogo,
    GabineteLogo,
    PartidoLogo,
};
