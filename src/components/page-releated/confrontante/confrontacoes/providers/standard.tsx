import React from "react";
import { IConfrontanteSide } from "../../../../../shared/providers/property/interfaces/property-confrontantes.interface";

interface ConfrontacoesProps {
    data: IConfrontanteSide[] | undefined;
    title: string;
}
export const ConfrontacoesJgv: React.FC<ConfrontacoesProps> = () => {
    return (
        <>
            <br />
            <div>Confrontações padrão</div>
        </>
    );
};
