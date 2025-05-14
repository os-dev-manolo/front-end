import React, { useRef, useState } from "react";

import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";

import { ApiErrorHandler } from "../../../../../../shared/utils/errors.utils";

import { showToast } from "../../../../../global/toast";
import environments from "../../../../../../environments";
import { ConfrontanteInfoApiService } from "../../../../../../shared/services/api/confrontantes-info-api.service";
import {
    IConfrontanteProperty,
    IConfrontantePropertyPOST,
} from "../../../../../../shared/providers/property/interfaces/property-confrontantes.interface";
import { MainButton } from "../../../../../global";
import { Input } from "../../../../../global/input/index";

interface EditFormProps {
    doAfterSubmit(subscription: string): void;
    confrontantesInfo?: IConfrontanteProperty | undefined;
}
export const EditProperty: React.FC<EditFormProps> = ({
    doAfterSubmit,

    confrontantesInfo,
}) => {
    const formRef = useRef<FormHandles>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const clientName = environments.client.name;
    const subscription = confrontantesInfo?.inscricaoimobiliaria as string;
    const register = confrontantesInfo?.cadastro as string;

    const handleSubmitEdit = async ({
        registerForm,
        subscriptionForm,
        ownerForm,
        bairronomeForm,
        logradouronomeForm,
        logradouronumeroForm,
        totalvalueForm,
        quadraForm,
        loteForm,
        areaterrenoForm,
        areaconstruidaForm,
        utilForm,
        metragemForm,
        testadaForm,
        matriculaForm,
    }: {
        registerForm: string;
        subscriptionForm: string;
        ownerForm: string;
        bairronomeForm: string;
        logradouronomeForm: string;
        logradouronumeroForm: string;
        totalvalueForm: string;
        quadraForm: string;
        loteForm: string;
        areaterrenoForm: string;
        areaconstruidaForm: string;
        utilForm: string;
        metragemForm: string;
        testadaForm: string;
        matriculaForm: string;
    }) => {
        const payload: IConfrontantePropertyPOST = {
            cadastro: registerForm,
            inscricaoimobiliaria: subscriptionForm,
            propnome: ownerForm,
            bairronome: bairronomeForm,
            logradouronome: logradouronomeForm,
            logradouronumero: logradouronumeroForm,
            valorvenaltotal: totalvalueForm,
            quadra: quadraForm,
            lote: loteForm,
            areaterreno: areaterrenoForm,
            areaconstruida: areaconstruidaForm,
            utilizacao: utilForm,
            metragem: metragemForm,
            testada: testadaForm,
            matricula: matriculaForm || "Não informado",
        };
        try {
            setLoading(true);
            await ConfrontanteInfoApiService.postConfrontanteImovel(payload);

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
    return (
        <div className="bg-gray-50">
            <p>Editar Imóvel</p>
            {!loading && (
                <Form
                    onSubmit={handleSubmitEdit}
                    ref={formRef}
                    className="w-full md:w-6/6"
                >
                    <div className="grid gap-1 grid-cols-3 grid-rows-1 relative">
                        <Input
                            name="registerForm"
                            label="Cadastro"
                            value={confrontantesInfo?.cadastro}
                            disabled
                        />
                        <Input
                            name="subscriptionForm"
                            label="Inscrição"
                            value={confrontantesInfo?.inscricaoimobiliaria}
                            disabled
                        />
                        <Input
                            name="ownerForm"
                            label="Proprietário"
                            value={confrontantesInfo?.propnome}
                            disabled
                        />
                        <Input
                            name="bairronomeForm"
                            label="Nome do bairro"
                            defaultValue={confrontantesInfo?.bairronome}
                        />
                        <Input
                            name="logradouronomeForm"
                            label="Nome do logradouro"
                            defaultValue={confrontantesInfo?.logradouronome}
                        />
                        <Input
                            name="logradouronumeroForm"
                            label="Nº do logradouro"
                            defaultValue={confrontantesInfo?.logradouronumero}
                        />
                        {clientName === "jcz" ? (
                            <Input
                                name="totalvalueForm"
                                label="Valor Venal Total"
                                defaultValue={
                                    confrontantesInfo?.valorvenaltotal
                                }
                            />
                        ) : (
                            <Input
                                name="totalvalueForm"
                                label="Valor Venal Total"
                                defaultValue={0}
                                hidden
                                disabled
                            />
                        )}
                        {clientName === "jgv" ? (
                            <Input
                                name="matriculaForm"
                                label="Matrícula"
                                defaultValue={confrontantesInfo?.matricula}
                            />
                        ) : (
                            <Input
                                name="matriculaForm"
                                label="Matrícula"
                                defaultValue={0}
                                hidden
                                disabled
                            />
                        )}
                        <Input
                            name="quadraForm"
                            label="Quadra"
                            defaultValue={confrontantesInfo?.quadra}
                        />
                        <Input
                            name="loteForm"
                            label="Lote"
                            defaultValue={confrontantesInfo?.lote}
                        />
                        <Input
                            name="areaterrenoForm"
                            label="Área do Terreno"
                            defaultValue={confrontantesInfo?.areaterreno}
                        />
                        <Input
                            name="areaconstruidaForm"
                            label="Área construída"
                            defaultValue={confrontantesInfo?.areaconstruida}
                        />
                        <Input
                            name="metragemForm"
                            label="Metragem até a Esquina"
                            defaultValue={confrontantesInfo?.metragem}
                        />
                        <Input
                            name="testadaForm"
                            label="Testada"
                            defaultValue={confrontantesInfo?.testada}
                        />
                        <Input
                            name="utilForm"
                            label="Utilização"
                            defaultValue={confrontantesInfo?.utilizacao}
                        />
                        <div className="md:w-2/3 h-10 mt-2">
                            <MainButton type="submit">SALVAR</MainButton>
                        </div>
                    </div>
                </Form>
            )}
        </div>
    );
};
