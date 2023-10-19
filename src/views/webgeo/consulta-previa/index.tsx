import React from "react";
import environments from "../../../environments";

import { StandardConsultaPrevia } from "./providers/standard";
import { CastroConsultaPrevia } from "./providers/castro";
import { JacarezinhoConsultaPrevia } from "./providers/jacarezinho";
import { TibagiConsultaPrevia } from "./providers/tibagi";
import { CarambeiConsultaPrevia } from "./providers/carambei";

export const ConsultaPrevia: React.FC = () => {
    switch (environments.client.name) {
        case "castro":
            return <CastroConsultaPrevia />;
        case "jcz":
            return <JacarezinhoConsultaPrevia />;
        case "tibagi":
            return <TibagiConsultaPrevia />;
        case "carambei":
            return <CarambeiConsultaPrevia />;
        default:
            return <StandardConsultaPrevia />;
    }
};
