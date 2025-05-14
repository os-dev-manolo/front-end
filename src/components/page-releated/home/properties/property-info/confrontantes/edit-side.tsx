import React, { useCallback, useRef, useState } from "react";

import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";

import { FormCheck } from "react-bootstrap";
import { IProperty } from "../../../../../../shared/interfaces/IProperties";
import { ApiErrorHandler } from "../../../../../../shared/utils/errors.utils";
import { showToast } from "../../../../../global/toast";
import { PropertiesApiService } from "../../../../../../shared/services/api/properties-api.service";
import { ConfrontanteInfoApiService } from "../../../../../../shared/services/api/confrontantes-info-api.service";
import { IConfrontanteSidePOST } from "../../../../../../shared/providers/property/interfaces/property-confrontantes.interface";
import { Input } from "../../../../../global/input/index";
import { MainButton } from "../../../../../global";

interface EditFormProps {
    doAfterSubmit(subscription: string): void;
    side: "back" | "left" | "right";
    propertyInfo?: IProperty;
}
const labelStyle = { fontSize: "15px", color: "#234e52" };

export const EditSide: React.FC<EditFormProps> = ({
    doAfterSubmit,
    side,
    propertyInfo,
}) => {
    const formRef = useRef<FormHandles>(null);

    const [loading, setLoading] = useState<boolean>(false);

    const [editType, setEditType] = useState<"address" | "property">("address");
    const [propertyFetched, setPropertyFetched] =
        useState<Partial<IProperty>>();

    const subscription = propertyInfo?.inscricaoimobiliaria as string;
    const register = propertyInfo?.cadastro as string;

    const handleSubmitEdit = async ({
        registerForm,
        subscriptionForm,
        ownerForm,
        bairronomeForm,
        logradouronomeForm,
        logradouronumeroForm,
        quadraForm,
        loteForm,
        areaterrenoForm,
        areaconstruidaForm,
        medidaForm,
        tipoForm,
        matriculaForm,
    }: {
        registerForm: string;
        subscriptionForm: string;
        ownerForm: string;
        bairronomeForm: string;
        logradouronomeForm: string;
        logradouronumeroForm: string;
        quadraForm: string;
        loteForm: string;
        areaterrenoForm: string;
        areaconstruidaForm: string;
        medidaForm: string;
        tipoForm: string;
        matriculaForm: string;
    }) => {
        const payload: IConfrontanteSidePOST = {
            inscricaoimobiliaria: subscription || "",
            cadastro: register || "",
            propnome: ownerForm,
            logradouronome: logradouronomeForm,
            logradouronumero: logradouronumeroForm,
            bairronome: bairronomeForm,
            quadra: quadraForm || "",
            lote: loteForm || "",
            areaterreno: areaterrenoForm,
            areaconstruida: areaconstruidaForm,
            medida: medidaForm,
            lado: side,
            tipo: tipoForm,
            inscricao_confrontacao: subscriptionForm,
            cadastro_confrontacao: registerForm,
            matricula_confrontacao: matriculaForm || "Não informado",
        };
        setLoading(true);
        try {
            await ConfrontanteInfoApiService.saveConfrontanteSide(payload);

            showToast({
                type: "success",
                message: "Dados da propriedade atualizados com sucesso",
            });

            doAfterSubmit(register as string);
        } catch (err) {
            ApiErrorHandler(err);
        } finally {
            setLoading(false);
        }
    };

    const handleRelatedByChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setEditType(event.target.value as "address" | "property");
    };

    const fetchPropertyInfo = useCallback(async (register_: string) => {
        try {
            setLoading(true);
            const query = `offset=0&limit=1&where={"cadastro":${JSON.stringify(
                register_
            )}}`;

            const property = await PropertiesApiService.listProperties(query, [
                "values",
                "testadas",
                "geom",
                "lastvalues",
                "characteristics",
            ]);

            setPropertyFetched(property.data[0]);
        } catch (err) {
            ApiErrorHandler(err);
        } finally {
            setLoading(false);
        }
    }, []);

    const handleSubmitSearch = async ({
        registerForm,
    }: {
        registerForm: string;
    }) => {
        if (registerForm) {
            fetchPropertyInfo(registerForm);
        }
    };

    return (
        <>
            <div className="bg-gray-50">
                <p>Editar Confrontação</p>
            </div>
            {!loading && (
                <div className="flex space-x-2 ml-2">
                    <p style={labelStyle}>Tipo de Confrontação:</p>
                    <FormCheck
                        type="radio"
                        name="editTypeAdress"
                        label="Rua"
                        onChange={handleRelatedByChange}
                        style={labelStyle}
                        value="address"
                        checked={editType === "address"}
                    />
                    <FormCheck
                        type="radio"
                        name="editTypeProperty"
                        label="Imóvel"
                        onChange={handleRelatedByChange}
                        style={labelStyle}
                        value="property"
                        checked={editType === "property"}
                    />
                </div>
            )}
            {editType === "address" && (
                <Form
                    onSubmit={handleSubmitEdit}
                    ref={formRef}
                    className="w-full md:w-6/6"
                >
                    <div className="grid gap-1 grid-cols-2 grid-rows-1 relative">
                        <Input
                            name="registerForm"
                            label="Cadastro"
                            defaultValue={propertyInfo?.cadastro}
                            readOnly
                            hidden
                        />
                        <Input
                            name="subscriptionForm"
                            label="Inscrição"
                            defaultValue={propertyInfo?.inscricaoimobiliaria}
                            readOnly
                            hidden
                        />
                        <Input
                            name="tipoForm"
                            value={editType}
                            readOnly
                            hidden
                        />
                        <Input
                            name="bairronomeForm"
                            label="Bairro"
                            defaultValue={propertyFetched?.bairronome}
                        />
                        <Input
                            name="logradouronomeForm"
                            label="Rua"
                            defaultValue={propertyFetched?.logradouronome}
                        />
                        <Input
                            name="medidaForm"
                            label="Medida da Confrontação"
                        />
                    </div>
                    <div className="w-full md:w-6/6 flex">
                        <div className="md:w-2/3 h-10 mt-2">
                            <MainButton type="submit">SALVAR</MainButton>
                        </div>
                    </div>
                </Form>
            )}
            {editType === "property" && (
                <Form
                    onSubmit={handleSubmitSearch}
                    ref={formRef}
                    className="w-full md:w-6/6"
                >
                    <div className="grid gap-1 grid-cols-3 grid-rows-1 relative">
                        <Input name="registerForm" label="Cadastro" />
                        <div className="md:w-2/3 h-10 mt-2">
                            <MainButton type="submit">BUSCAR</MainButton>
                        </div>
                    </div>
                </Form>
            )}
            {editType === "property" && propertyFetched && (
                <div className="bg-gray-50">
                    <Form
                        onSubmit={handleSubmitEdit}
                        ref={formRef}
                        className="w-full md:w-6/6"
                    >
                        <div className="grid gap-1 grid-cols-3 grid-rows-1 relative">
                            <Input
                                name="tipoForm"
                                value={editType}
                                disabled
                                hidden
                            />
                            <Input
                                name="registerForm"
                                label="Cadastro"
                                value={propertyFetched?.cadastro}
                                readOnly
                            />
                            <Input
                                name="subscriptionForm"
                                label="Inscrição"
                                value={propertyFetched?.inscricaoimobiliaria}
                                readOnly
                            />
                            <Input
                                name="ownerForm"
                                label="Proprietário"
                                value={propertyFetched?.propnome}
                                readOnly
                            />
                            <Input
                                name="matriculaForm"
                                label="Matrícula"
                                value={propertyFetched?.matricula}
                            />
                            <Input
                                name="bairronomeForm"
                                label="Nome do bairro"
                                defaultValue={propertyFetched?.bairronome}
                            />
                            <Input
                                name="logradouronomeForm"
                                label="Nome do logradouro"
                                defaultValue={propertyFetched?.logradouronome}
                            />
                            <Input
                                name="logradouronumeroForm"
                                label="Nº do logradouro"
                                defaultValue={propertyFetched?.logradouronumero}
                            />
                            <Input
                                name="quadraForm"
                                label="Quadra"
                                defaultValue={propertyFetched?.quadra}
                            />
                            <Input
                                name="loteForm"
                                label="Lote"
                                defaultValue={propertyFetched?.lote}
                            />
                            <Input
                                name="areaterrenoForm"
                                label="Área do Terreno"
                                defaultValue={propertyFetched?.areaterreno}
                            />
                            <Input
                                name="areaconstruidaForm"
                                label="Área construída"
                                defaultValue={propertyFetched?.areaconstruida}
                            />
                            <Input
                                name="medidaForm"
                                label="Medida Confrontação"
                            />
                        </div>
                        <div className="w-full md:w-6/6 flex">
                            <div className="md:w-2/3 h-10 mt-2">
                                <MainButton type="submit">SALVAR</MainButton>
                            </div>
                        </div>
                    </Form>
                </div>
            )}
        </>
    );
};
