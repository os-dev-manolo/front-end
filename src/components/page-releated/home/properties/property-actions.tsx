/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useCallback, useEffect, useState } from "react";

import {
    BsPrinterFill,
    BsJournalCheck,
    BsCreditCard,
    BsFileBreak,
    BsFillPinMapFill,
} from "react-icons/bs";

import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

import { showToast } from "../../../global/toast";
import { drawPolygon } from "../../../../shared/utils/ol.utils";
import { useOlMap } from "../../../../shared/hooks/useOlMap";
import env from "../../../../environments";
import { IProperty } from "../../../../shared/interfaces/IProperties";
import { useAuth } from "../../../../shared/hooks/useAuth";
import { FeaturesEnum } from "../../../../shared/enums/features.enum";

interface PropertyActionsProps {
    property: Partial<IProperty>;
    disableLocation?: boolean;
    doAfterClick?(): void;
    iconsSize?: number;
}

interface IUserAccess {
    bci: boolean;
    properties: boolean;
    iptu: boolean;
    consultaPrevia: boolean;
    confrontante: boolean;
}

export const PropertyActions: React.FC<PropertyActionsProps> = ({
    property,
    disableLocation,
    doAfterClick,
    iconsSize = 18,
}) => {
    const { user } = useAuth();
    const { map } = useOlMap();
    const [clientName, setClientName] = useState<string>("");

    const [userAccess, setUserAccess] = useState<IUserAccess>(
        {} as IUserAccess
    );

    const drawPropertyGeom = useCallback(() => {
        if (!map) return;

        if (!property.geom) {
            showToast({ type: "warn", message: "Lote não encontrado" });

            return;
        }

        drawPolygon({
            coordinates: property.geom.geom,
            map,
            padding: [180, 180, 180, 180],
        });

        if (doAfterClick) {
            doAfterClick();
        }
    }, [map, doAfterClick, property.geom]);

    useEffect(() => {
        const allowedFeatures = user.authorizationsByFeatureName;
        setClientName(env.client.name);
        setUserAccess({
            bci: allowedFeatures[FeaturesEnum.BCI]?.canRead,
            confrontante: allowedFeatures[FeaturesEnum.CONFRONTANTE]?.canRead,
            consultaPrevia:
                allowedFeatures[FeaturesEnum.CONSULTA_PREVIA]?.canRead,
            iptu: allowedFeatures[FeaturesEnum.IPTU]?.canRead,
            properties: allowedFeatures[FeaturesEnum.PROPERTIES]?.canRead,
        });
    }, [user.authorizationsByFeatureName]);

    if (!userAccess) return null;

    return (
        <>
            {!disableLocation && userAccess.properties && (
                <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>LOCALIZAR</Tooltip>}
                >
                    <button type="button" onClick={drawPropertyGeom}>
                        <BsFillPinMapFill color="teal" size={iconsSize} />
                    </button>
                </OverlayTrigger>
            )}

            {env.webgeo.config.bci && userAccess.bci && (
                <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>BCI</Tooltip>}
                >
                    {clientName.match("jgv") ? (
                        <a
                            href={`/bci/${property.cadastro}`}
                            target="_blank"
                            rel="noreferrer"
                            onClick={doAfterClick}
                        >
                            <BsPrinterFill color="teal" size={iconsSize} />
                        </a>
                    ) : (
                        <a
                            href={`/bci/${property.inscricaoimobiliaria}`}
                            target="_blank"
                            rel="noreferrer"
                            onClick={doAfterClick}
                        >
                            <BsPrinterFill color="teal" size={iconsSize} />
                        </a>
                    )}
                </OverlayTrigger>
            )}

            {env.webgeo.config.iptu && userAccess.iptu && (
                <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>IPTU</Tooltip>}
                >
                    {clientName.match("jgv") ? (
                        <a href="#" onClick={doAfterClick}>
                            <BsCreditCard color="teal" size={iconsSize} />
                        </a>
                    ) : (
                        <a href="#" onClick={doAfterClick}>
                            <BsCreditCard color="teal" size={iconsSize} />
                        </a>
                    )}
                </OverlayTrigger>
            )}

            {env.webgeo.config.consultaPrevia && userAccess.consultaPrevia && (
                <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>CONSULTA PRÉVIA</Tooltip>}
                >
                    {clientName.match("jgv") ? (
                        <a
                            href={`/consulta-previa/${property.cadastro}`}
                            target="_blank"
                            onClick={doAfterClick}
                            rel="noreferrer"
                        >
                            <BsJournalCheck color="teal" size={iconsSize} />
                        </a>
                    ) : (
                        <a
                            href={`/consulta-previa/${property.inscricaoimobiliaria}`}
                            target="_blank"
                            onClick={doAfterClick}
                            rel="noreferrer"
                        >
                            <BsJournalCheck color="teal" size={iconsSize} />
                        </a>
                    )}
                </OverlayTrigger>
            )}

            {env.webgeo.config.confrontante && userAccess.confrontante && (
                <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>CONFRONTANTE</Tooltip>}
                >
                    {clientName.match("jgv") ? (
                        <a
                            href={`/confrontante/${property.cadastro}`}
                            target="_blank"
                            onClick={doAfterClick}
                            rel="noreferrer"
                        >
                            <BsFileBreak color="teal" size={iconsSize} />
                        </a>
                    ) : (
                        <a
                            href={`/confrontante/${property.inscricaoimobiliaria}`}
                            target="_blank"
                            onClick={doAfterClick}
                            rel="noreferrer"
                        >
                            <BsFileBreak color="teal" size={iconsSize} />
                        </a>
                    )}
                </OverlayTrigger>
            )}
        </>
    );
};
