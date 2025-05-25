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

const Fundacao = () => (
    <Input name="fundacao" type="date" label="Data de Fundação" />
);

const CNPJ = () => <Input name="cnpj" type="text" label="CNPJ" />;

const Email = () => (
    <Input name="email" type="text" label="Email institucional" />
);

const EmailComercial = () => (
    <Input name="email_comercial" type="text" label="Email comercial" />
);

const TelefonePrincipal = () => (
    <Input name="telefone_principal" type="text" label="Telefone principal" />
);

const TelefoneSecundario = () => (
    <Input name="telefone_secundario" type="text" label="Telefone secundário" />
);

const CriadoEm = () => (
    <SingleDatePicker name="criado_em" label="Registro criado em" />
);

const AtualizadoEm = () => (
    <SingleDatePicker name="atualizado_em" label="Registro atualizado em" />
);

const Newsletter = () => (
    <Checkbox name="newsletter" type="checkbox" label="Recebe newsletter" />
);

const Observacao = () => (
    <InputMultiLined name="observacao" type="text" label="Observações" />
);

// ===== Campos Select =====

const NaturezaJuridica = () => (
    <Select
        name="natureza_juridica"
        label="Natureza Jurídica"
        options={[
            { label: "Associação", value: "associacao" },
            { label: "Fundação", value: "fundacao" },
            { label: "ONG", value: "ong" },
            { label: "Outros", value: "outros" },
        ]}
    />
);

const RelacaoInstitucional = () => (
    <Select
        name="relacao_institucional"
        label="Relação institucional"
        options={[
            { label: "Parceiro", value: "parceiro" },
            { label: "Apoiador", value: "apoiador" },
            { label: "Outro", value: "outro" },
        ]}
    />
);

const BooleanSelect = (name: string, label: string) => () =>
    (
        <Select
            name={name}
            label={label}
            options={[
                { label: "Sim", value: "true" },
                { label: "Não", value: "false" },
            ]}
        />
    );

const PossuiRepresentante = BooleanSelect(
    "possui_representante",
    "Possui representante?"
);

// ===== Endereço =====

type AddressType = "residencial" | "comercial";

export const AddressInputs = ({
    addressType,
}: {
    addressType: AddressType;
}) => {
    const prefix =
        addressType === "residencial" ? "residencial_" : "comercial_";

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
        </>
    );
};

export const AddressTypeSwitcher = ({
    onChange,
}: {
    onChange: (type: AddressType) => void;
}) => {
    return (
        <Select
            name="address_type"
            label="Tipo de Endereço"
            options={[
                { label: "Residencial", value: "residencial" },
                { label: "Comercial", value: "comercial" },
            ]}
            onChange={(option) => {
                const value = (option as { value: AddressType })?.value;
                if (value === "residencial" || value === "comercial") {
                    onChange(value);
                }
            }}
            isClearable={false}
        />
    );
};

const AddressSection = () => {
    const [addressType, setAddressType] = useState<AddressType>("residencial");

    return (
        <>
            <AddressTypeSwitcher onChange={setAddressType} />
            <AddressInputs addressType={addressType} />
        </>
    );
};

// ===== Agrupadores =====

export const FilterInputs = [Id, RazaoSocial, CriadoEm, AtualizadoEm];

export const CreateInputs = [
    RazaoSocial,
    CNPJ,
    Fundacao,
    NaturezaJuridica,
    Email,
    EmailComercial,
    TelefonePrincipal,
    TelefoneSecundario,
    AddressSection,
    PossuiRepresentante,
    RelacaoInstitucional,
    Newsletter,
    Observacao,
];

export const UpdateInputs = [
    RazaoSocial,
    CNPJ,
    Fundacao,
    NaturezaJuridica,
    Email,
    EmailComercial,
    TelefonePrincipal,
    TelefoneSecundario,
    AddressSection,
    PossuiRepresentante,
    RelacaoInstitucional,
    Newsletter,
    Observacao,
];
