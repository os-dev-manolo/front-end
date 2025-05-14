import React, { useRef, useState } from "react";

import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";

import { IProperty } from "../../../../../../shared/interfaces/IProperties";
import { ApiErrorHandler } from "../../../../../../shared/utils/errors.utils";
import { showToast } from "../../../../../global/toast";
import environments from "../../../../../../environments";
import { ConfrontanteInfoApiService } from "../../../../../../shared/services/api/confrontantes-info-api.service";
import { IConfrontantePropertyPOST } from "../../../../../../shared/providers/property/interfaces/property-confrontantes.interface";
import { MainButton } from "../../../../../global";
import { Input } from "../../../../../global/input/index";

interface AddFormProps {
    doAfterSubmit(subscription: string): void;
    propertyInfo?: IProperty;
    valorVenalTotal?: string | number;
    utilizacao?: string;
    testada?: string;
}
export const AddProperty: React.FC<AddFormProps> = ({
    doAfterSubmit,
    propertyInfo,
    valorVenalTotal,
    utilizacao,
    testada,
}) => {
    const formRef = useRef<FormHandles>(null);
    const [loading, setLoading] = useState<boolean>(false);

    // const subscription = propertyInfo?.inscricaoimobiliaria as string;
    const register = propertyInfo?.cadastro as string;
    const clientName = environments.client.name;

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
            <p>Adicionar Imóvel</p>
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
                            defaultValue={propertyInfo?.cadastro}
                            disabled
                        />
                        <Input
                            name="subscriptionForm"
                            label="Inscrição"
                            defaultValue={propertyInfo?.inscricaoimobiliaria}
                            disabled
                        />
                        <Input
                            name="ownerForm"
                            label="Proprietário"
                            defaultValue={propertyInfo?.propnome}
                            disabled
                        />
                        <Input
                            name="bairronomeForm"
                            label="Nome do bairro"
                            defaultValue={propertyInfo?.bairronome}
                        />
                        <Input
                            name="logradouronomeForm"
                            label="Nome do logradouro"
                            defaultValue={propertyInfo?.logradouronome}
                        />
                        <Input
                            name="logradouronumeroForm"
                            label="Nº do logradouro"
                            defaultValue={propertyInfo?.logradouronumero}
                        />
                        {clientName === "jcz" ? (
                            <Input
                                name="totalvalueForm"
                                label="Valor Venal Total"
                                defaultValue={valorVenalTotal}
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
                                defaultValue={propertyInfo?.matricula}
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
                            defaultValue={propertyInfo?.quadra}
                        />
                        <Input
                            name="loteForm"
                            label="Lote"
                            defaultValue={propertyInfo?.lote}
                        />
                        <Input
                            name="areaterrenoForm"
                            label="Área do Terreno"
                            defaultValue={propertyInfo?.areaterreno}
                        />
                        <Input
                            name="areaconstruidaForm"
                            label="Área construída"
                            defaultValue={propertyInfo?.areaconstruida}
                        />
                        <Input
                            name="metragemForm"
                            label="Metragem até a Esquina"
                        />
                        <Input
                            name="testadaForm"
                            label="Testada"
                            defaultValue={testada}
                        />
                        <Input
                            name="utilForm"
                            label="Utilização"
                            defaultValue={utilizacao}
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
