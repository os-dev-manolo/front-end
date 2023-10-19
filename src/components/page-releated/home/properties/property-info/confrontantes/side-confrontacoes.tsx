/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { BsArrowLeftSquare, BsPlusSquare } from "react-icons/bs";
import { FeaturesEnum } from "../../../../../../shared/enums/features.enum";
import { useAuth } from "../../../../../../shared/hooks/useAuth";
import { IProperty } from "../../../../../../shared/interfaces/IProperties";
import { IConfrontanteSide } from "../../../../../../shared/providers/property/interfaces/property-confrontantes.interface";
import { ConfrontanteInfoApiService } from "../../../../../../shared/services/api/confrontantes-info-api.service";
import { PropertiesApiService } from "../../../../../../shared/services/api/properties-api.service";
import { ApiErrorHandler } from "../../../../../../shared/utils/errors.utils";
import { showToast } from "../../../../../global/toast";
import { EditSide } from "./edit-side";
import { SideGeneric } from "./side-generic";

interface Props {
    doAfterSubmit(subscription: string): void;
    side: "back" | "left" | "right";
    subscription?: string | undefined;
    clientName: string;
}
export const SideConfrontacoes: React.FC<Props> = ({
    doAfterSubmit,
    side,
    subscription,
    clientName,
}) => {
    const { user } = useAuth();
    const [propertyInfo, setPropertyInfo] = useState<IProperty>();
    const [confrontanteInfo, setConfrontanteInfo] =
        useState<IConfrontanteSide[]>();
    const [enableEdit, setEnableEdit] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    // const register = propertyInfo?.cadastro || undefined;

    const fetchConfrontantesInfo = useCallback(
        async (subscription_: string) => {
            try {
                setLoading(true);
                const property = await PropertiesApiService.getProperty({
                    subscription: subscription_,
                });

                setPropertyInfo(property);
            } catch (err) {
                ApiErrorHandler(err, "warn");
            } finally {
                setLoading(false);
            }
        },
        []
    );

    const handleEnableEdit = () => {
        setEnableEdit(!enableEdit);
        setLoading(!loading);
    };

    useEffect(() => {
        if (subscription) {
            fetchConfrontantesInfo(subscription);
        }
    }, []);

    const fetchConfrontantesSideInfo = useCallback(
        async (subscription_: string) => {
            try {
                setLoading(true);
                const infoSide =
                    await ConfrontanteInfoApiService.getConfrontanteSide(
                        subscription_,
                        side
                    );

                setConfrontanteInfo(infoSide.data);
            } catch (err) {
                ApiErrorHandler(err, "warn");
            } finally {
                setLoading(false);
            }
        },
        []
    );

    useEffect(() => {
        if (subscription) {
            fetchConfrontantesSideInfo(subscription);
        }
    }, [fetchConfrontantesSideInfo, subscription]);

    const deleteConfrontacao = useCallback(async (id: string) => {
        try {
            setLoading(true);

            const deleted =
                await ConfrontanteInfoApiService.deleteConfrontanteSide(id);

            showToast({
                message: `Confrontação deletada com sucesso ${deleted}`,
                type: "success",
            });
        } catch (err) {
            ApiErrorHandler(err, "warn");
        } finally {
            setLoading(false);
        }
    }, []);

    const handleAfterSubmit = () => {
        setEnableEdit(!enableEdit);
        setLoading(!loading);
        doAfterSubmit(subscription as string);
    };

    const askDelete = (id: string) => {
        if (id) {
            deleteConfrontacao(id);
            doAfterSubmit(subscription as string);
        }
    };

    return (
        <>
            <OverlayTrigger
                placement="top"
                overlay={
                    <Tooltip>
                        {enableEdit ? "VOLTAR" : "ADICIONAR CONFRONTAÇÃO"}
                    </Tooltip>
                }
            >
                <div className="mb-3 flex space-x-2 justify-center">
                    {user.authorizationsByFeatureName[
                        FeaturesEnum.INFO_CONFRONTANTE
                    ]?.canUpdate && (
                        <button type="button" onClick={handleEnableEdit}>
                            {enableEdit ? (
                                <BsArrowLeftSquare color="teal" size={20} />
                            ) : (
                                <BsPlusSquare color="teal" size={20} />
                            )}
                        </button>
                    )}
                </div>
            </OverlayTrigger>
            {enableEdit && (
                <EditSide
                    doAfterSubmit={handleAfterSubmit}
                    propertyInfo={propertyInfo}
                    side={side}
                />
            )}
            {!loading && (
                <SideGeneric
                    confrontanteInfo={confrontanteInfo}
                    askDelete={askDelete}
                    clientName={clientName}
                />
            )}
        </>
    );
};
