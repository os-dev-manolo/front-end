/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useCallback, useRef, useState } from "react";
import { Form as Unform } from "@unform/web";
import { FormHandles } from "@unform/core";
import { Col, Row } from "react-bootstrap";
import { AiOutlineSave } from "react-icons/ai";
import {
    Checkbox,
    Input,
    MainButton,
    Select,
} from "../../../../../components/global";

export const RegisterNovo: React.FC = () => {
    const formRef = useRef<FormHandles>(null);

    const [loading, setLoading] = useState<boolean>(false);

    const onSubmit = useCallback(async () => {
        // implementar envio
        console.log("vai tomando");
    }, []);

    return (
        <Unform
            ref={formRef}
            onSubmit={onSubmit} // className="modal-header"
        >
            <div>
                <h2 className="text-2xl font-bold mb-4">
                    Cadastro de Pessoa Física Completo
                </h2>
                <div className="grid grid-cols-2 gap-1">
                    <div className="bg-green-200">
                        <Row className="mb-3">
                            <Col md={12}>
                                <Input
                                    name="nome"
                                    label="Nome completo"
                                    type="text"
                                />
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col md={6}>
                                <Input
                                    name="nascimento"
                                    label="Nascimento"
                                    type="date"
                                />
                            </Col>
                            <Col md={6}>
                                <Select
                                    name="sexo"
                                    label="Sexo"
                                    options={[
                                        {
                                            label: "Masculino",
                                            value: "Masculino",
                                        },
                                        {
                                            label: "Feminino",
                                            value: "Feminino",
                                        },
                                        { label: "Outro", value: "Outro" },
                                        {
                                            label: "Não informado",
                                            value: "Não informado",
                                        },
                                    ]}
                                />
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col md={6}>
                                <Input name="rg" label="RG" type="text" />
                            </Col>
                            <Col md={6}>
                                <Input
                                    name="cpf"
                                    label="CPF"
                                    type="text"
                                    maxLength={14}
                                />
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col md={6}>
                                <Input
                                    name="estado_civil"
                                    label="Estado civil"
                                    type="text"
                                />
                            </Col>
                            <Col md={6}>
                                <Input
                                    name="formacao"
                                    label="Formação"
                                    type="text"
                                />
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col md={6}>
                                <Input
                                    name="correspondencia"
                                    label="Correspondência"
                                    type="text"
                                />
                            </Col>
                            <Col md={6}>
                                <Input
                                    name="foto"
                                    label="Foto (URL ou base64)"
                                    type="text"
                                />
                            </Col>
                        </Row>
                    </div>
                    <div className="mb-3 bg-red-500">
                        <Row>
                            <h2 className="text-2xl font-bold mb-4">
                                Endereço
                            </h2>
                            <Col md={5}>
                                <Input
                                    name="residencial_endereco"
                                    label="Endereço residencial"
                                    type="text"
                                />
                            </Col>
                            <Col md={3}>
                                <Input
                                    name="residencial_cep"
                                    label="CEP residencial"
                                    type="text"
                                />
                            </Col>
                            <Col md={3}>
                                <Input
                                    name="residencial_estado"
                                    label="Estado"
                                    type="text"
                                />
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col md={3}>
                                <Input
                                    name="residencial_bairro"
                                    label="Bairro"
                                    type="text"
                                />
                            </Col>
                            <Col md={3}>
                                <Input
                                    name="residencial_numero"
                                    label="Número"
                                    type="text"
                                />
                            </Col>
                            <Col md={4}>
                                <Input
                                    name="residencial_cidade"
                                    label="Cidade"
                                    type="text"
                                />
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col md={3}>
                                <Input
                                    name="residencial_complemento"
                                    label="Complemento"
                                    type="text"
                                />
                            </Col>
                            <Col md={3}>
                                <Input
                                    name="residencial_microrregional"
                                    label="Microrregião"
                                    type="text"
                                />
                            </Col>
                            <Col md={3}>
                                <Input
                                    name="residencial_regiao"
                                    label="Região"
                                    type="text"
                                />
                            </Col>
                        </Row>
                    </div>
                    <div className="bg-green-600">
                        <h2 className="text-2xl font-bold mb-4">Telefone</h2>

                        {/* Repetidos residenciais removidos para evitar duplicidade */}
                        <Row className="mb-3">
                            <Col md={3}>
                                <Input
                                    name="telefone_ramal"
                                    label="Ramal"
                                    type="text"
                                />
                            </Col>
                            <Col md={3}>
                                <Input
                                    name="telefone_operadora"
                                    label="Operadora"
                                    type="text"
                                />
                            </Col>
                            <Col md={4}>
                                <Select
                                    name="telefone_tipo"
                                    label="Tipo Telefone"
                                    options={[
                                        { label: "Celular", value: "Celular" },
                                        { label: "Fixo", value: "Fixo" },
                                    ]}
                                />
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col md={6}>
                                <Input
                                    name="telefone_principal"
                                    label="Telefone principal"
                                    type="text"
                                    maxLength={15}
                                />
                            </Col>
                            <Col md={6}>
                                <Input
                                    name="telefone_secundario"
                                    label="Telefone secundário"
                                    type="text"
                                    maxLength={15}
                                />
                            </Col>
                        </Row>
                    </div>
                    <div className="bg-yellow-600">
                        <Row className="mb-3">
                            <h2 className="text-2xl font-bold mb-4">Email</h2>
                            <Col md={6}>
                                <Input
                                    name="email_pessoal"
                                    label="Email pessoal"
                                    type="text"
                                />
                            </Col>
                            <Col md={6}>
                                <Input
                                    name="email_comercial"
                                    label="Email comercial"
                                    type="text"
                                />
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <h2 className="text-2xl font-bold mb-4">Website</h2>
                            <Col md={6}>
                                <Input
                                    name="website_tipo"
                                    label="Tipo de website"
                                    type="text"
                                />
                            </Col>
                            <Col md={6}>
                                <Input
                                    name="website_link"
                                    label="Website"
                                    type="text"
                                />
                            </Col>
                        </Row>
                    </div>
                    <div className="bg-purple-300">
                        <Row className="mb-3">
                            <h2 className="text-2xl font-bold mb-4">
                                Comercial
                            </h2>
                            <Col md={12}>
                                <Input
                                    name="comercial_endereco"
                                    label="Endereço comercial"
                                    type="text"
                                />
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col md={6}>
                                <Input
                                    name="comercial_estado"
                                    label="Estado"
                                    type="text"
                                />
                            </Col>
                            <Col md={6}>
                                <Input
                                    name="comercial_cep"
                                    label="CEP comercial"
                                    type="text"
                                />
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col md={6}>
                                <Input
                                    name="comercial_cidade"
                                    label="Cidade"
                                    type="text"
                                />
                            </Col>
                            <Col md={6}>
                                <Input
                                    name="comercial_bairro"
                                    label="Bairro"
                                    type="text"
                                />
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col md={6}>
                                <Input
                                    name="comercial_numero"
                                    label="Número"
                                    type="text"
                                />
                            </Col>
                            <Col md={6}>
                                <Input
                                    name="comercial_complemento"
                                    label="Complemento"
                                    type="text"
                                />
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col md={6}>
                                <Input
                                    name="comercial_microrregional"
                                    label="Microrregião"
                                    type="text"
                                />
                            </Col>
                            <Col md={6}>
                                <Input
                                    name="comercial_regiao"
                                    label="Região"
                                    type="text"
                                />
                            </Col>
                        </Row>
                        <div className="bg-yellow-500">
                            <Row className="mb-3">
                                <h2 className="text-2xl font-bold mb-4">
                                    Política
                                </h2>
                                <Col md={6}>
                                    <Input
                                        name="zona"
                                        label="Zona eleitoral"
                                        type="text"
                                    />
                                </Col>
                                <Col md={6}>
                                    <Input
                                        name="secao"
                                        label="Seção eleitoral"
                                        type="text"
                                    />
                                </Col>
                            </Row>

                            <Row className="mb-3">
                                <Col md={6}>
                                    <Input
                                        name="titulo_eleitoral"
                                        label="Título de eleitor"
                                        type="text"
                                    />
                                </Col>
                                <Col md={6}>
                                    <Input
                                        name="cartao_sus"
                                        label="Cartão SUS"
                                        type="text"
                                    />
                                </Col>
                            </Row>

                            <Row className="mb-3">
                                <Col md={6}>
                                    <Input
                                        name="nome_mae"
                                        label="Nome da mãe"
                                        type="text"
                                    />
                                </Col>
                                <Col md={6}>
                                    <Input
                                        name="nome_pai"
                                        label="Nome do pai"
                                        type="text"
                                    />
                                </Col>
                            </Row>
                        </div>
                    </div>
                    <div className="bg-gray-300">
                        <Row className="mb-3">
                            <h2 className="text-2xl font-bold mb-4">
                                Atributos
                            </h2>
                            <Col md={6}>
                                <Input
                                    name="apelido"
                                    label="Apelido"
                                    type="text"
                                />
                            </Col>
                            <Col md={6}>
                                <Input
                                    name="base_politica"
                                    label="Base política"
                                    type="text"
                                />
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col md={6}>
                                <Checkbox
                                    name="candidato"
                                    label="É candidato(a)?"
                                />
                            </Col>
                            <Col md={6}>
                                <Select
                                    name="cargo_publico"
                                    label="Possui cargo público?"
                                    options={[
                                        { label: "Possui", value: "true" },
                                        { label: "Não possui", value: "false" },
                                    ]}
                                />
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col md={6}>
                                <Input
                                    name="classificacao"
                                    label="Classificação"
                                    type="text"
                                />
                            </Col>
                            <Col md={6}>
                                <Input
                                    name="contato"
                                    label="Contato"
                                    type="text"
                                />
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col md={6}>
                                <Input
                                    name="coordenador"
                                    label="Coordenador"
                                    type="text"
                                />
                            </Col>
                            <Col md={6}>
                                <Input
                                    name="corrente"
                                    label="Corrente"
                                    type="text"
                                />
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col md={6}>
                                <Input
                                    name="igreja"
                                    label="Igreja"
                                    type="text"
                                />
                            </Col>
                            <Col md={6}>
                                <Input
                                    name="indicado_por"
                                    label="Indicado por"
                                    type="text"
                                />
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col md={6}>
                                <Input
                                    name="lideranca"
                                    label="Liderança"
                                    type="text"
                                />
                            </Col>
                            <Col md={6}>
                                <Input
                                    name="multiplicador"
                                    label="Multiplicador"
                                    type="text"
                                />
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col md={6}>
                                <Input
                                    name="numero_filhos"
                                    label="Número de filhos"
                                    type="number"
                                />
                            </Col>
                            <Col md={6}>
                                <Input
                                    name="orientacao_sexual"
                                    label="Orientação sexual"
                                    type="text"
                                />
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col md={6}>
                                <Input
                                    name="partido"
                                    label="Partido"
                                    type="text"
                                />
                            </Col>
                            <Col md={6}>
                                <Input
                                    name="profissao"
                                    label="Profissão"
                                    type="text"
                                />
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col md={6}>
                                <Input
                                    name="pronome_tratamento"
                                    label="Pronome de tratamento"
                                    type="text"
                                />
                            </Col>
                            <Col md={6}>
                                <Input
                                    name="raca_cor"
                                    label="Raça/Cor"
                                    type="text"
                                />
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col md={6}>
                                <Input
                                    name="religiao"
                                    label="Religião"
                                    type="text"
                                />
                            </Col>
                            <Col md={6}>
                                <Input
                                    name="cargo_etiqueta"
                                    label="Cargo etiqueta"
                                    type="text"
                                />
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col md={6}>
                                <Checkbox
                                    name="presidente_partidario"
                                    label="Presidente partidário"
                                />
                            </Col>
                            <Col md={6}>
                                <Checkbox
                                    name="newsletter"
                                    label="Autoriza newsletter"
                                />
                            </Col>
                        </Row>
                    </div>
                </div>
                <br />
                <MainButton
                    type="submit"
                    loading={loading}
                    style={{
                        width: "24%",
                        marginLeft: "auto",
                        height: "40px",
                    }}
                >
                    <AiOutlineSave />
                    CADASTRAR
                </MainButton>
                <br />
            </div>
        </Unform>
    );
};
