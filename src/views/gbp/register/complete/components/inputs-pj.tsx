import { useState } from "react";
import { Checkbox } from "../../../../../components/global";
import { Input, InputMultiLined } from "../../../../../components/global/input";
import { Select } from "../../../../../components/global/select";
import { SingleDatePicker } from "../../../../../components/global/event-date-picker";

// ===== Campos Simples =====

const Id = () => <Input name="id" type="number" label="Id" />;
const RazaoSocial = () => (
    <Input name="razao_social" type="text" label="Razão Social" />
);
const NomeFantasia = () => (
    <Input name="nome_fantasia" type="text" label="Nome Fantasia" />
);
const CNPJ = () => <Input name="cnpj" type="text" label="CNPJ" />;
const InscricaoEstadual = () => (
    <Input name="inscricao_estadual" type="text" label="Inscrição Estadual" />
);
const InscricaoMunicipal = () => (
    <Input name="inscricao_municipal" type="text" label="Inscrição Municipal" />
);
const PorteEmpresa = () => (
    <Input name="porte_empresa" type="text" label="Porte da Empresa" />
);
const DataAbertura = () => (
    <Input name="data_abertura" type="date" label="Data de Abertura" />
);
const AtividadePrincipal = () => (
    <Input name="atividade_principal" type="text" label="Atividade Principal" />
);
const AtividadesSecundarias = () => (
    <Input
        name="atividades_secundarias"
        type="text"
        label="Atividades Secundárias"
    />
);
const CapitalSocial = () => (
    <Input name="capital_social" type="number" label="Capital Social" />
);

// ===== Contato =====

const EmailComercial = () => (
    <Input name="email_comercial" type="text" label="Email Comercial" />
);
const TelefonePrincipal = () => (
    <Input name="telefone_principal" type="text" label="Telefone Principal" />
);
const TelefoneSecundario = () => (
    <Input name="telefone_secundario" type="text" label="Telefone Secundário" />
);
const TelefoneTipo = () => (
    <Input name="telefone_tipo" type="text" label="Tipo de Telefone" />
);
const TelefoneDDD = () => <Input name="telefone_ddd" type="text" label="DDD" />;
const TelefoneRamal = () => (
    <Input name="telefone_ramal" type="text" label="Ramal" />
);
const TelefoneOperadora = () => (
    <Input name="telefone_operadora" type="text" label="Operadora" />
);
const WebsiteTipo = () => (
    <Input name="website_tipo" type="text" label="Tipo de Website" />
);
const WebsiteLink = () => (
    <Input name="website_link" type="text" label="Link do Website" />
);
const Contato = () => <Input name="contato" type="text" label="Contato" />;
const AutorizaNewsletter = () => (
    <Checkbox
        name="autoriza_newsletter"
        type="checkbox"
        label="Autoriza receber newsletter?"
    />
);
const Newsletter = () => (
    <Input name="newsletter" type="text" label="Tipo de Newsletter" />
);

// ===== Endereços =====

type AddressType = "comercial" | "residencial";

const AddressInputs = ({ addressType }: { addressType: AddressType }) => {
    const prefix = `${addressType}_`;

    return (
        <>
            <Input name={`${prefix}cep`} type="text" label="CEP" />
            <Input name={`${prefix}estado`} type="text" label="Estado" />
            <Input name={`${prefix}cidade`} type="text" label="Cidade" />
            <Input name={`${prefix}bairro`} type="text" label="Bairro" />
            <Input name={`${prefix}endereco`} type="text" label="Endereço" />
            <Input name={`${prefix}numero`} type="text" label="Número" />
            <Input
                name={`${prefix}complemento`}
                type="text"
                label="Complemento"
            />
            <Input
                name={`${prefix}microrregional`}
                type="text"
                label="Microrregional"
            />
            <Input name={`${prefix}regiao`} type="text" label="Região" />
        </>
    );
};

const Correspondencia = () => (
    <Input
        name="correspondencia"
        type="text"
        label="Endereço de Correspondência"
    />
);

// ===== Político / Institucional =====

const CargoPublico = () => (
    <Input name="cargo_publico" type="text" label="Cargo Público" />
);
const Partido = () => <Input name="partido" type="text" label="Partido" />;
const RelacaoPolitica = () => (
    <Input name="relacao_politica" type="text" label="Relação Política" />
);
const Cargo = () => <Input name="cargo" type="text" label="Cargo" />;
const CargoEtiqueta = () => (
    <Input name="cargo_etiqueta" type="text" label="Cargo Etiqueta" />
);
const Coordenador = () => (
    <Input name="coordenador" type="text" label="Coordenador" />
);
const PresidentePartidario = () => (
    <Input
        name="presidente_partidario"
        type="text"
        label="Presidente Partidário"
    />
);
const BasePolitica = () => (
    <Input name="base_politica" type="text" label="Base Política" />
);
const ClassificadoComo = () => (
    <Input name="classificado_como" type="text" label="Classificado Como" />
);
const Corrente = () => <Input name="corrente" type="text" label="Corrente" />;
const IndicadoPor = () => (
    <Input name="indicado_por" type="text" label="Indicado Por" />
);
const Lideranca = () => (
    <Input name="lideranca" type="text" label="Liderança" />
);
const Multiplicador = () => (
    <Input name="multiplicador" type="text" label="Multiplicador" />
);
const Apelido = () => <Input name="apelido" type="text" label="Apelido" />;

// ===== Perfil Institucional =====

const Igreja = () => <Input name="igreja" type="text" label="Igreja" />;
const Religiao = () => <Input name="religiao" type="text" label="Religião" />;
const RacaCor = () => <Input name="raca_cor" type="text" label="Raça/Cor" />;
const PronomeTratamento = () => (
    <Input
        name="pronome_tratamento"
        type="text"
        label="Pronome de Tratamento"
    />
);
const Formacao = () => <Input name="formacao" type="text" label="Formação" />;
const Profissao = () => (
    <Input name="profissao" type="text" label="Profissão" />
);

// ===== Multimídia / Observações =====

const Foto = () => <Input name="foto" type="text" label="Foto (URL)" />;
const Observacao = () => (
    <InputMultiLined name="observacao" label="Observações" />
);

// ===== Datas de controle =====

// ===== Agrupadores =====

export const FilterInputs = [Id, RazaoSocial, CNPJ];

export const CreateInputs = [
    RazaoSocial,
    NomeFantasia,
    CNPJ,
    InscricaoEstadual,
    InscricaoMunicipal,
    PorteEmpresa,
    DataAbertura,
    AtividadePrincipal,
    AtividadesSecundarias,
    CapitalSocial,
    EmailComercial,
    TelefonePrincipal,
    TelefoneSecundario,
    TelefoneTipo,
    TelefoneDDD,
    TelefoneRamal,
    TelefoneOperadora,
    WebsiteTipo,
    WebsiteLink,
    Contato,
    AutorizaNewsletter,
    Newsletter,
    AddressInputs.bind(null, { addressType: "comercial" }),
    AddressInputs.bind(null, { addressType: "residencial" }),
    Correspondencia,
    CargoPublico,
    Partido,
    RelacaoPolitica,
    Cargo,
    CargoEtiqueta,
    Coordenador,
    PresidentePartidario,
    BasePolitica,
    ClassificadoComo,
    Corrente,
    IndicadoPor,
    Lideranca,
    Multiplicador,
    Apelido,
    Igreja,
    Religiao,
    RacaCor,
    PronomeTratamento,
    Formacao,
    Profissao,
    Foto,
    Observacao,
];

export const UpdateInputs = [...CreateInputs];
