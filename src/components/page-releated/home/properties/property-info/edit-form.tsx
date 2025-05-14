import React, { useEffect, useRef, useState } from "react";

import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";

import { FormCheck } from "react-bootstrap";

import { Dropzone, Input, MainButton, FileList } from "../../../../global";
import { showToast } from "../../../../global/toast";

import { IProperty } from "../../../../../shared/interfaces/IProperties";
import { ApiErrorHandler } from "../../../../../shared/utils/errors.utils";
import { useProperties } from "../../../../../shared/contexts/properties.context";

interface EditFormProps {
    doAfterSubmit(subscription: string): void;
    propertyInfo?: IProperty;
    geomSubscription: string;
    geomId: number;
}

const labelStyle = { fontSize: "15px", color: "#234e52" };

export const EditForm: React.FC<EditFormProps> = ({
    doAfterSubmit,
    propertyInfo,
    geomSubscription,
    geomId,
}) => {
    const formRef = useRef<FormHandles>(null);

    const {
        updatePropertyByGeom,
        updatePropertyBySybscription,
        uploadPropertyFiles,
    } = useProperties();

    const [loading, setLoading] = useState<boolean>(false);
    const [propertyFiles, setPropertyFiles] = useState<string[]>();
    const [editRelatedBy, setEditRelatedBy] = useState<"geom" | "subscription">(
        propertyInfo ? "subscription" : "geom"
    );

    const handleRelatedByChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setEditRelatedBy(event.target.value as "geom" | "subscription");
    };

    const updateCurrentFiles = (newFiles: string[]) => {
        setPropertyFiles(newFiles);
    };

    const handleSubmit = async ({
        files,
        observation,
        subscription,
    }: {
        observation?: string;
        subscription: string;
        files?: File[];
    }) => {
        if (!subscription) {
            showToast({
                type: "warn",
                message: "Inscrição obrigatória",
            });
            return;
        }

        setLoading(true);

        let newFiles = propertyFiles || [];

        try {
            // caso existam arquivos para realizar upload enviam esses arquivos para api
            // e concatenam as urls com os previos arquivos
            if (files?.length) {
                const uploadedFiles = await uploadPropertyFiles(
                    files,
                    subscription
                );

                newFiles = newFiles.concat(uploadedFiles);
            }

            if (editRelatedBy === "geom") {
                await updatePropertyByGeom({
                    geomId: geomId as number,
                    subscription,
                    files: newFiles,
                    observation: observation || undefined,
                });
            } else {
                await updatePropertyBySybscription({
                    subscription,
                    propertyId: propertyInfo?.id as number,
                    files: newFiles,
                    observation: observation || undefined,
                });
            }

            showToast({
                type: "success",
                message: "Dados da propriedade atualizados com sucesso",
            });

            doAfterSubmit(subscription as string);
        } catch (err) {
            ApiErrorHandler(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setPropertyFiles(propertyInfo?.anexos);
        formRef.current?.setData({
            observation: propertyInfo?.observacao,
            subscription:
                propertyInfo?.inscricaoimobiliaria || geomSubscription,
        });
    }, [propertyInfo, geomSubscription]);

    return (
        <div className="flex justify-center items-center">
            <Form
                onSubmit={handleSubmit}
                ref={formRef}
                className="md:w-2/4 space-y-2"
            >
                <Input name="observation" label="Observação" />
                <Input
                    name="subscription"
                    label="Inscrição"
                    hidden={editRelatedBy === "subscription"}
                />
                {propertyFiles && propertyFiles.length > 0 && (
                    <FileList
                        files={propertyFiles}
                        canRemove
                        title="Arquivos salvos"
                        doAfterRemoveFromList={updateCurrentFiles}
                    />
                )}
                <Dropzone name="files" />
                {propertyInfo && (
                    <div className="flex space-x-2 ml-2">
                        <p style={labelStyle}>Edição relacionada:</p>
                        <FormCheck
                            type="radio"
                            name="li_related_by"
                            label="Inscrição"
                            onChange={handleRelatedByChange}
                            style={labelStyle}
                            value="subscription"
                            checked={editRelatedBy === "subscription"}
                        />
                        <FormCheck
                            type="radio"
                            name="li_related_by"
                            label="Feição"
                            onChange={handleRelatedByChange}
                            style={labelStyle}
                            value="geom"
                            checked={editRelatedBy === "geom"}
                        />
                    </div>
                )}
                <MainButton type="submit" loading={loading}>
                    EDITAR
                </MainButton>
            </Form>
        </div>
    );
};
