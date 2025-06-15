/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/button-has-type */
import { useRef, useState } from "react";
import { Col, Nav, Row } from "react-bootstrap";
import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import { Checkbox } from "../../../../../components/global";
import { Input } from "../../../../../components/global/input";
import { Select } from "../../../../../components/global/select";
import { RegisterNovo } from ".";

// Mascaras
function formatCpf(value: string): string {
    return value
        .replace(/\D/g, "")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

function formatPhone(value: string): string {
    const cleaned = value.replace(/\D/g, "").slice(0, 11); // remove não dígitos, limita a 11

    if (cleaned.length <= 10) {
        // Telefone fixo: (99) 9999-9999
        return cleaned
            .replace(/^(\d{2})(\d)/, "($1) $2")
            .replace(/(\d{4})(\d)/, "$1-$2");
    }

    return (
        cleaned
            // Celular: (99) 99999-9999
            .replace(/^(\d{2})(\d)/, "($1) $2")
            .replace(/(\d{5})(\d)/, "$1-$2")
    );
}

const Name = () => <Input name="nome" label="Nome completo" type="text" />;

const BirthDate = () => (
    <Input name="nascimento" label="Nascimento" type="date" />
);

const CPF = () => {
    const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formatted = formatCpf(e.target.value);
        e.target.value = formatted;
    };

    return (
        <Input
            name="cpf"
            type="text"
            label="CPF"
            onChange={handleCpfChange}
            maxLength={14}
        />
    );
};

const Genre = () => (
    <Select
        name="sexo"
        label="Sexo"
        options={[
            { label: "Masculino", value: "Masculino" },
            { label: "Feminino", value: "Feminino" },
            { label: "Outro", value: "Outro" },
            { label: "Não informado", value: "Não informado" },
        ]}
    />
);

const BoostrapTest = () => {
    const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formatted = formatCpf(e.target.value);
        e.target.value = formatted;
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formatted = formatPhone(e.target.value);
        e.target.value = formatted;
    };

    return (
        <div className="container">
            <div className="grid grid-cols-2 gap-1">
                <div className="container border rounded">
                    <h2 className="text-2xl font-bold mb-3">Pessoa Física</h2>
                    <Row className="mb-3">
                        <Col className="p-0">
                            <Input
                                name="nome"
                                label="Nome completo"
                                type="text"
                            />
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col md={4} className="p-0">
                            <Input
                                className="w-100"
                                name="nascimento"
                                label="Nascimento"
                                type="date"
                            />
                        </Col>
                        <Col md={4} className="p-0">
                            <Input
                                className="w-100"
                                name="cpf"
                                label="CPF"
                                type="text"
                                onChange={handleCpfChange}
                                maxLength={14}
                            />
                        </Col>
                        <Col md={4} className="p-0">
                            <Input
                                className="w-100"
                                name="cartao_sus"
                                label="Cartão SUS"
                                type="text"
                            />
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col className="p-0">
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
                        <Col className="p-0">
                            <Select
                                name="estado_civil"
                                label="Estado civil"
                                options={[
                                    {
                                        label: "Solteiro(a)",
                                        value: "Solteiro(a)",
                                    },
                                    {
                                        label: "Casado(a)",
                                        value: "Casado(a)",
                                    },
                                    {
                                        label: "Viúvo(a)",
                                        value: "Viúvo(a)",
                                    },
                                    {
                                        label: "Divorciado(a)",
                                        value: "Divorciado(a)",
                                    },
                                    {
                                        label: "Separado(a) judicialmente",
                                        value: "Separado(a) judicialmente",
                                    },
                                    {
                                        label: "Não informado",
                                        value: "Não informado",
                                    },
                                ]}
                            />
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col className="p-0">
                            <Select
                                name="formacao"
                                label="Escolaridade"
                                options={[
                                    {
                                        label: "Nenhuma escolaridade",
                                        value: "Nenhuma escolaridade",
                                    },
                                    {
                                        label: "Ensino Fundamental Incompleto",
                                        value: "Ensino Fundamental Incompleto",
                                    },
                                    {
                                        label: "Ensino Fundamental Completo",
                                        value: "Ensino Fundamental Completo",
                                    },
                                    {
                                        label: "Ensino Médio Incompleto",
                                        value: "Ensino Médio Incompleto",
                                    },
                                    {
                                        label: "Ensino Médio Completo",
                                        value: "Ensino Médio Completo",
                                    },
                                    {
                                        label: "Ensino Superior Incompleto",
                                        value: "Ensino Superior Incompleto",
                                    },
                                    {
                                        label: "Ensino Superior Completo",
                                        value: "Ensino Superior Completo",
                                    },
                                    {
                                        label: "Pós-Graduado (Especialização, Mestrado ou Doutorado)",
                                        value: "Pós-Graduado (Especialização, Mestrado ou Doutorado)",
                                    },
                                    {
                                        label: "Não informado",
                                        value: "Não informado",
                                    },
                                ]}
                            />
                        </Col>
                        <Col className="p-0">
                            <Input
                                name="foto"
                                label="Foto (URL ou base64)"
                                type="text"
                            />
                        </Col>
                    </Row>
                </div>
                <div className="container border rounded">
                    <h2 className="text-2xl font-bold mb-3">Contato</h2>
                    <Row className="mb-3">
                        <Col md={4} className="p-0">
                            <Select
                                name="telefone_tipo"
                                label="Tipo Telefone"
                                options={[
                                    { label: "Celular", value: "Celular" },
                                    { label: "Fixo", value: "Fixo" },
                                ]}
                            />
                        </Col>
                        <Col md={8} className="p-0">
                            <Input
                                name="telefone_operadora"
                                label="Operadora"
                                type="text"
                            />
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col md={6} className="p-0">
                            <Input
                                name="telefone_principal"
                                label="Telefone principal"
                                type="text"
                                onChange={handlePhoneChange}
                                maxLength={15}
                            />
                        </Col>
                        <Col md={6} className="p-0">
                            <Input
                                name="telefone_secundario"
                                label="Telefone secundário"
                                type="text"
                                onChange={handlePhoneChange}
                                maxLength={15}
                            />
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col md={6} className="p-0">
                            <Input
                                name="email_pessoal"
                                label="Email principal"
                                type="text"
                            />
                        </Col>
                        <Col md={6} className="p-0">
                            <Input
                                name="email_comercial"
                                label="Email secundário"
                                type="text"
                            />
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col md={6} className="p-0">
                            <Input
                                name="website_tipo"
                                label="Tipo de website"
                                type="text"
                            />
                        </Col>
                        <Col md={6} className="p-0">
                            <Input
                                name="website_link"
                                label="Website"
                                type="text"
                            />
                        </Col>
                    </Row>
                </div>
                <div className="container border rounded">
                    <h2 className="text-2xl font-bold mb-3">Endereço</h2>
                    <Row className="mb-3">
                        <Col md={4} className="p-0">
                            <Input
                                className="w-100"
                                name="residencial_regiao"
                                label="Região"
                                type="text"
                            />
                        </Col>
                        <Col md={4} className="p-0">
                            <Input
                                className="w-100"
                                name="residencial_microrregional"
                                label="Microrregião"
                                type="text"
                            />
                        </Col>
                        <Col md={4} className="p-0">
                            <Input
                                className="w-100"
                                name="residencial_estado"
                                label="Estado"
                                type="text"
                            />
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col md={4} className="p-0">
                            <Input
                                className="w-100"
                                name="residencial_cidade"
                                label="Cidade"
                                type="text"
                            />
                        </Col>
                        <Col md={4} className="p-0">
                            <Input
                                className="w-100"
                                name="residencial_cep"
                                label="CEP"
                                type="text"
                            />
                        </Col>
                        <Col md={4} className="p-0">
                            <Input
                                className="w-100"
                                name="residencial_bairro"
                                label="Bairro"
                                type="text"
                            />
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col md={10} className="p-0">
                            <Input
                                name="residencial_endereco"
                                label="Endereço"
                                type="text"
                            />
                        </Col>
                        <Col md={2} className="p-0">
                            <Input
                                className="w-100"
                                name="residencial_numero"
                                label="Número"
                                type="text"
                            />
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col className="p-0">
                            <Input
                                className="w-100"
                                name="residencial_complemento"
                                label="Complemento"
                                type="text"
                            />
                        </Col>
                    </Row>
                </div>
                <div className="container border rounded">
                    <h2 className="text-2xl font-bold mb-3">
                        Endereço Comercial
                    </h2>
                    <Row className="mb-3">
                        <Col md={4} className="p-0">
                            <Input
                                className="w-100"
                                name="comercial_regiao"
                                label="Região"
                                type="text"
                            />
                        </Col>
                        <Col md={4} className="p-0">
                            <Input
                                className="w-100"
                                name="comercial_microrregional"
                                label="Microrregião"
                                type="text"
                            />
                        </Col>
                        <Col md={4} className="p-0">
                            <Input
                                className="w-100"
                                name="comercial_estado"
                                label="Estado"
                                type="text"
                            />
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col md={4} className="p-0">
                            <Input
                                className="w-100"
                                name="comercial_cidade"
                                label="Cidade"
                                type="text"
                            />
                        </Col>
                        <Col md={4} className="p-0">
                            <Input
                                className="w-100"
                                name="comercial_cep"
                                label="CEP"
                                type="text"
                            />
                        </Col>
                        <Col md={4} className="p-0">
                            <Input
                                className="w-100"
                                name="comercial_bairro"
                                label="Bairro"
                                type="text"
                            />
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col md={10} className="p-0">
                            <Input
                                name="comercial_endereco"
                                label="Endereço"
                                type="text"
                            />
                        </Col>
                        <Col md={2} className="p-0">
                            <Input
                                className="w-100"
                                name="comercial_numero"
                                label="Número"
                                type="text"
                            />
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col className="p-0">
                            <Input
                                className="w-100"
                                name="comercial_complemento"
                                label="Complemento"
                                type="text"
                            />
                        </Col>
                    </Row>
                </div>
                <div className="container border rounded">
                    <h2 className="text-2xl font-bold mb-3">Política</h2>
                    <Row className="mb-3">
                        <Col md={6} className="p-0">
                            <Input
                                className="w-100"
                                name="titulo_eleitoral"
                                label="Título de eleitor"
                                type="text"
                            />
                        </Col>
                        <Col md={3} className="p-0">
                            <Input
                                className="w-100"
                                name="zona"
                                label="Zona eleitoral"
                                type="text"
                            />
                        </Col>
                        <Col md={3} className="p-0">
                            <Input
                                className="w-100"
                                name="secao"
                                label="Seção eleitoral"
                                type="text"
                            />
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col md={4} className="p-0">
                            <Input
                                className="w-100"
                                name="base_politica"
                                label="Base política"
                                type="text"
                            />
                        </Col>
                        <Col md={4} className="p-0">
                            <Input
                                className="w-100"
                                name="classificacao"
                                label="Classificação"
                                type="text"
                            />
                        </Col>
                        <Col md={4} className="p-0">
                            <Input
                                className="w-100"
                                name="contato"
                                label="Contato"
                                type="text"
                            />
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col md={4} className="p-0">
                            <Input
                                className="w-100"
                                name="coordenador"
                                label="Coordenador"
                                type="text"
                            />
                        </Col>
                        <Col md={4} className="p-0">
                            <Input
                                className="w-100"
                                name="corrente"
                                label="Corrente"
                                type="text"
                            />
                        </Col>
                        <Col md={4} className="p-0">
                            <Input
                                className="w-100"
                                name="indicado_por"
                                label="Indicado por"
                                type="text"
                            />
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col md={4} className="p-0">
                            <Input
                                className="w-100"
                                name="lideranca"
                                label="Liderança"
                                type="text"
                            />
                        </Col>
                        <Col md={4} className="p-0">
                            <Input
                                className="w-100"
                                name="multiplicador"
                                label="Multiplicador"
                                type="text"
                            />
                        </Col>
                        <Col md={4} className="p-0">
                            <Input
                                className="w-100"
                                name="partido"
                                label="Partido"
                                type="text"
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4} className="p-0">
                            <Input
                                className="w-100"
                                name="cargo_etiqueta"
                                label="Cargo etiqueta"
                                type="text"
                            />
                        </Col>
                        <Col md={4}>
                            <Checkbox
                                name="candidato"
                                label="É candidato(a)?"
                            />
                        </Col>
                        <Col md={4}>
                            <Checkbox
                                name="presidente_partidario"
                                label="Presidente partidário"
                            />
                        </Col>
                    </Row>
                </div>
                <div className="container border rounded">
                    <h2 className="text-2xl font-bold mb-3">Atributos</h2>
                    <Row className="mb-3">
                        <Col md={6} className="p-0">
                            <Input
                                className="w-100"
                                name="nome_mae"
                                label="Nome da mãe"
                                type="text"
                            />
                        </Col>
                        <Col md={6} className="p-0">
                            <Input
                                className="w-100"
                                name="nome_pai"
                                label="Nome do pai"
                                type="text"
                            />
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col md={4} className="p-0">
                            <Input
                                className="w-100"
                                name="apelido"
                                label="Apelido"
                                type="text"
                            />
                        </Col>
                        <Col md={4} className="p-0">
                            <Input
                                className="w-100"
                                name="profissao"
                                label="Profissão"
                                type="text"
                            />
                        </Col>
                        <Col md={4} className="p-0">
                            <Input
                                className="w-100"
                                name="numero_filhos"
                                label="Número de filhos"
                                type="number"
                            />
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col md={4} className="p-0">
                            <Input
                                className="w-100"
                                name="orientacao_sexual"
                                label="Orientação sexual"
                                type="text"
                            />
                        </Col>
                        <Col md={4} className="p-0">
                            <Input
                                className="w-100"
                                name="pronome_tratamento"
                                label="Pronome de tratamento"
                                type="text"
                            />
                        </Col>
                        <Col md={4} className="p-0">
                            <Input
                                className="w-100"
                                name="raca_cor"
                                label="Raça/Cor"
                                type="text"
                            />
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col md={6} className="p-0">
                            <Input
                                className="w-100"
                                name="religiao"
                                label="Religião"
                                type="text"
                            />
                        </Col>
                        <Col md={6} className="p-0">
                            <Input
                                className="w-100"
                                name="igreja"
                                label="Igreja"
                                type="text"
                            />
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col md={6} className="p-0">
                            <Select
                                name="cargo_publico"
                                label="Possui cargo público?"
                                options={[
                                    { label: "Possui", value: "true" },
                                    { label: "Não possui", value: "false" },
                                ]}
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
        </div>
    );
};

export default BoostrapTest;

// Filtros e arrays finais
export const FilterInputs = [Name, CPF, BirthDate];

export const CreateInputs = [BoostrapTest];

export const UpdateInputs = [BoostrapTest];
