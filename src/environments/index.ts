import { ClientsEnum } from "../shared/enums/clients.enum";
import { IEnvironment } from "../shared/interfaces/IEnvironments";

import PartidoADev from "./providers/partidoA/dev.env";
import PartidoAPrd from "./providers/partidoA/prd.env";

import PartidoBDev from "./providers/partidoB/dev.env";
import PartidoBPrd from "./providers/partidoB/prd.env";

import PartidoCDev from "./providers/partidoC/dev.env";
import PartidoCPrd from "./providers/partidoC/prd.env";

const EnvironmentsProviders: Record<
    ClientsEnum,
    Record<string, IEnvironment>
> = {
    [ClientsEnum.PARTIDO_A]: {
        dev: PartidoADev,
        prd: PartidoAPrd,
    },
    [ClientsEnum.PARTIDO_B]: {
        dev: PartidoBDev,
        prd: PartidoBPrd,
    },
    [ClientsEnum.PARTIDO_C]: {
        dev: PartidoCDev,
        prd: PartidoCPrd,
    },
};

export default EnvironmentsProviders[
    process.env.REACT_APP_CLIENT as ClientsEnum
][process.env.REACT_APP_ENV as string];
