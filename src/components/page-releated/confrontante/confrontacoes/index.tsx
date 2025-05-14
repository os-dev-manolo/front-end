import React from "react";

import environments from "../../../../environments";
import { IConfrontanteSide } from "../../../../shared/providers/property/interfaces/property-confrontantes.interface";
import { ConfrontacoesJcz } from "./providers/jcz";
import { ConfrontacoesJgv } from "./providers/jgv";

interface ConfrontacoesProps {
    data: IConfrontanteSide[] | undefined;
    title: string;
}

export const Confrontacoes: React.FC<ConfrontacoesProps> = ({
    data,
    title,
}) => {
    switch (environments.client.name) {
        case "jcz":
            return <ConfrontacoesJcz data={data} title={title} />;
        case "jgv":
            return <ConfrontacoesJgv data={data} title={title} />;
        default:
            return <ConfrontacoesJcz data={data} title={title} />;
    }
};
