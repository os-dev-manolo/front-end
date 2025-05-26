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

const Name = () => <Input name="nome" label="Nome completo" type="text" />;

const BirthDate = () => (
    <Input name="nascimento" label="Nascimento" type="date" />
);
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
const Correspondence = () => (
    <Input name="correspondencia" label="Correspondência" type="text" />
);
const Photo = () => (
    <Input name="foto" label="Foto (URL ou base64)" type="text" />
);

// Telefones
const PhoneType = () => (
    <Select
        name="telefone_tipo"
        label="Tipo Telefone"
        options={[
            {
                label: "Celular",
                value: "Celular",
            },
            {
                label: "Fixo",
                value: "Fixo",
            },
        ]}
    />
);

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

const Phone = () => {
    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formatted = formatPhone(e.target.value);
        e.target.value = formatted;
    };

    return (
        <Input
            name="telefone_principal"
            type="text"
            label="Telefone principal"
            onChange={handlePhoneChange}
            maxLength={15}
        />
    );
};

const SecondaryPhone = () => {
    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formatted = formatPhone(e.target.value);
        e.target.value = formatted;
    };

    return (
        <Input
            name="telefone_secundario"
            type="text"
            label="Telefone secundário"
            onChange={handlePhoneChange}
            maxLength={15}
        />
    );
};

const TypeAdress = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="max-w-md mx-auto p-4 border rounded shadow">
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                {isExpanded ? "Collapse" : "Expand"}
            </button>

            {isExpanded && (
                <div className="mt-4 p-4 bg-gray-100 rounded transition-all duration-300">
                    <Input
                        name="residencial_endereco"
                        label="Endereço residencial"
                        type="text"
                    />
                    <Input
                        name="residencial_cep"
                        label="CEP residencial"
                        type="text"
                    />
                    <Input
                        name="residencial_estado"
                        label="Estado"
                        type="text"
                    />
                    <Input
                        name="residencial_bairro"
                        label="Bairro"
                        type="text"
                    />
                </div>
            )}
        </div>
    );
};
const BoostrapTest = () => {
    return (
        <>
            <Row className="mb-3">
                <Col md={12}>
                    <Input name="nome" label="Nome completo" type="text" />
                </Col>
                <Col md={3}>
                    <Input name="nascimento" label="Nascimento" type="date" />
                </Col>
                <Col md={3}>
                    <Select
                        name="sexo"
                        label="Sexo"
                        options={[
                            { label: "Masculino", value: "Masculino" },
                            { label: "Feminino", value: "Feminino" },
                            { label: "Outro", value: "Outro" },
                            {
                                label: "Não informado",
                                value: "Não informado",
                            },
                        ]}
                    />
                </Col>
            </Row>
            <RegisterNovo />
        </>
    );
};

export default BoostrapTest;

const Ramal = () => <Input name="telefone_ramal" label="Ramal" type="text" />;
const Operator = () => (
    <Input name="telefone_operadora" label="Operadora" type="text" />
);

// Contato digital
const Email = () => (
    <Input name="email_pessoal" label="Email pessoal" type="text" />
);
const EmailCommercial = () => (
    <Input name="email_comercial" label="Email comercial" type="text" />
);
const WebsiteType = () => (
    <Input name="website_tipo" label="Tipo de website" type="text" />
);
const Website = () => <Input name="website_link" label="Website" type="text" />;

// Endereço residencial
const ResEndereco = () => (
    <Input
        name="residencial_endereco"
        label="Endereço residencial"
        type="text"
    />
);
const ResCep = () => (
    <Input name="residencial_cep" label="CEP residencial" type="text" />
);
const ResEstado = () => (
    <Input name="residencial_estado" label="Estado" type="text" />
);
const ResCidade = () => (
    <Input name="residencial_cidade" label="Cidade" type="text" />
);
const ResBairro = () => (
    <Input name="residencial_bairro" label="Bairro" type="text" />
);
const ResNumero = () => (
    <Input name="residencial_numero" label="Número" type="text" />
);
const ResComplemento = () => (
    <Input name="residencial_complemento" label="Complemento" type="text" />
);
const ResMicro = () => (
    <Input name="residencial_microrregional" label="Microrregião" type="text" />
);
const ResRegiao = () => (
    <Input name="residencial_regiao" label="Região" type="text" />
);

// Endereço comercial
const ComEndereco = () => (
    <Input name="comercial_endereco" label="Endereço comercial" type="text" />
);
const ComCep = () => (
    <Input name="comercial_cep" label="CEP comercial" type="text" />
);
const ComEstado = () => (
    <Input name="comercial_estado" label="Estado" type="text" />
);
const ComCidade = () => (
    <Input name="comercial_cidade" label="Cidade" type="text" />
);
const ComBairro = () => (
    <Input name="comercial_bairro" label="Bairro" type="text" />
);
const ComNumero = () => (
    <Input name="comercial_numero" label="Número" type="text" />
);
const ComComplemento = () => (
    <Input name="comercial_complemento" label="Complemento" type="text" />
);
const ComMicro = () => (
    <Input name="comercial_microrregional" label="Microrregião" type="text" />
);
const ComRegiao = () => (
    <Input name="comercial_regiao" label="Região" type="text" />
);

// Complementar/político
const Apelido = () => <Input name="apelido" label="Apelido" type="text" />;
const BasePolitica = () => (
    <Input name="base_politica" label="Base política" type="text" />
);
const Candidato = () => <Checkbox name="candidato" label="É candidato(a)?" />;

const BooleanSelect = (name: string, label: string) => () =>
    (
        <Select
            name={name}
            label={label}
            options={[
                {
                    label: "Possui",
                    value: "true",
                },
                {
                    label: "Não possui",
                    value: "false",
                },
            ]}
        />
    );

const Cargo = BooleanSelect("cargo_publico", "Possui cargo público?");

const Classificacao = () => (
    <Input name="classificacao" label="Classificação" type="text" />
);
const Contato = () => <Input name="contato" label="Contato" type="text" />;
const Coordenador = () => (
    <Input name="coordenador" label="Coordenador" type="text" />
);
const Corrente = () => <Input name="corrente" label="Corrente" type="text" />;
const EstadoCivil = () => (
    <Input name="estado_civil" label="Estado civil" type="text" />
);
const Formacao = () => <Input name="formacao" label="Formação" type="text" />;
const Igreja = () => <Input name="igreja" label="Igreja" type="text" />;
const IndicadoPor = () => (
    <Input name="indicado_por" label="Indicado por" type="text" />
);
const Lideranca = () => (
    <Input name="lideranca" label="Liderança" type="text" />
);
const Multiplicador = () => (
    <Input name="multiplicador" label="Multiplicador" type="text" />
);
const NumFilhos = () => (
    <Input name="numero_filhos" label="Número de filhos" type="number" />
);
const OrientSexual = () => (
    <Input name="orientacao_sexual" label="Orientação sexual" type="text" />
);
const Partido = () => <Input name="partido" label="Partido" type="text" />;
const Profissao = () => (
    <Input name="profissao" label="Profissão" type="text" />
);
const Tratamento = () => (
    <Input
        name="pronome_tratamento"
        label="Pronome de tratamento"
        type="text"
    />
);
const RacaCor = () => <Input name="raca_cor" label="Raça/Cor" type="text" />;
const Religiao = () => <Input name="religiao" label="Religião" type="text" />;
const CargoEtiqueta = () => (
    <Input name="cargo_etiqueta" label="Cargo etiqueta" type="text" />
);
const PresidentePartido = () => (
    <Checkbox name="presidente_partidario" label="Presidente partidário" />
);
const Newsletter = () => (
    <Checkbox name="newsletter" label="Autoriza newsletter" />
);

// Documentos
function formatCpf(value: string): string {
    return value
        .replace(/\D/g, "")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

const RG = () => <Input name="rg" label="RG" type="text" />;
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
const Zona = () => <Input name="zona" label="Zona eleitoral" type="text" />;
const Secao = () => <Input name="secao" label="Seção eleitoral" type="text" />;
const Titulo = () => (
    <Input name="titulo_eleitoral" label="Título de eleitor" type="text" />
);
const CartaoSUS = () => (
    <Input name="cartao_sus" label="Cartão SUS" type="text" />
);
const NomeMae = () => <Input name="nome_mae" label="Nome da mãe" type="text" />;
const NomePai = () => <Input name="nome_pai" label="Nome do pai" type="text" />;

// Filtros e arrays finais
export const FilterInputs = [Name, CPF, BirthDate];

// export const CreateInputs = [
//     Name,
//     BirthDate,
//     Genre,
//     Correspondence,
//     Photo,
//     PhoneType,
//     Phone,
//     SecondaryPhone,
//     Ramal,
//     Operator,
//     Email,
//     EmailCommercial,
//     WebsiteType,
//     Website,
//     ResCep,
//     ResEstado,
//     ResCidade,
//     ResEndereco,
//     ResBairro,
//     ResNumero,
//     ResComplemento,
//     ResMicro,
//     ResRegiao,
//     ComCep,
//     ComEstado,
//     ComCidade,
//     ComEndereco,
//     ComBairro,
//     ComNumero,
//     ComComplemento,
//     ComMicro,
//     ComRegiao,
//     Apelido,
//     BasePolitica,
//     Candidato,
//     Cargo,
//     Classificacao,
//     Contato,
//     Coordenador,
//     Corrente,
//     EstadoCivil,
//     Formacao,
//     Igreja,
//     IndicadoPor,
//     Lideranca,
//     Multiplicador,
//     NumFilhos,
//     OrientSexual,
//     Partido,
//     Profissao,
//     Tratamento,
//     RacaCor,
//     Religiao,
//     CargoEtiqueta,
//     PresidentePartido,
//     Newsletter,
//     RG,
//     CPF,
//     Zona,
//     Secao,
//     Titulo,
//     CartaoSUS,
//     NomeMae,
//     NomePai,
// ];
export const CreateInputs = [BoostrapTest];
export const UpdateInputs = [BoostrapTest];
