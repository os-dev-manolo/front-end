import { useState } from "react";
import { Checkbox } from "../../../../../components/global";
import { Input, InputMultiLined } from "../../../../../components/global/input";
import { Select } from "../../../../../components/global/select";
import { SingleDatePicker } from "../../../../../components/global/event-date-picker";

const Id = () => <Input name="id" type="number" label="Id" />;

const Name = () => <Input name="nome" type="text" label="Nome" />;

const BirthDate = () => (
    <Input name="nascimento" type="date" label="Nascimento" />
);

const Email = () => (
    <Input name="email_pessoal" type="text" label="Email pessoal" />
);

const EmailCommercial = () => (
    <Input name="email_comercial" type="text" label="Email comercial" />
);

const Genre = () => (
    <Select
        name="sexo"
        label="Gênero"
        options={[
            {
                label: "Masculino",
                value: "Masculino",
            },
            {
                label: "Feminino",
                value: "Feminino",
            },
            {
                label: "Outro",
                value: "Outro",
            },
            {
                label: "Não informado",
                value: "Não informado",
            },
        ]}
    />
);

export const AddressInputs = ({
    addressType,
}: {
    addressType: "residencial" | "comercial";
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

function formatCpf(value: string): string {
    return value
        .replace(/\D/g, "")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

const Document = () => {
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

// const Region = () => <Input name="regiao" type="text" label="Região" />;

// const MicroRegion = () => (
//     <Input name="microrregiao" type="text" label="Microrregião" />
// );

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

const MainPhone = () => {
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

const CreatedAt = () => (
    <SingleDatePicker name="criado_em" label="Registro criado em" />
);

const UpdatedAt = () => (
    <SingleDatePicker name="atualizado_em" label="Registro atualizado em" />
);

type AddressType = "residencial" | "comercial";

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
    const [addressType, setAddressType] = useState<"residencial" | "comercial">(
        "residencial"
    );

    return (
        <>
            <AddressTypeSwitcher onChange={setAddressType} />
            <AddressInputs addressType={addressType} />
        </>
    );
};

// const Coallation = () => {
//     const [options, setOptions] = useState<SelectOptions[]>([]);

//     const convertOptions = async (opts: PoliticalChain[]) => {
//         const selectOptions: SelectOptions[] = [];

//         opts.forEach((element: PoliticalChain) => {
//             const option: SelectOptions = {
//                 label: element.nome,
//                 value: element.id,
//             };
//             selectOptions.push(option);
//         });
//         return selectOptions;
//     };

//     useEffect(() => {
//         (async () => {
//             const polticalChains =
//                 await StandardGbpApiService.get<PoliticalChain>({
//                     path: "crud/correntes-politicas",
//                     params: {},
//                 });

//             const op = await convertOptions(polticalChains.data);
//             setOptions(op);
//         })();
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, []);

//     return (
//         <Select
//             name="id_coligacao"
//             label="Coligação"
//             options={options}
//             isClearable
//         />
//     );
// };

const Newsletter = () => (
    <Checkbox name="newsletter" type="checkbox" label="Recebe newsletter" />
);

const Observation = () => (
    <InputMultiLined name="observacao" type="text" label="Observação" />
);

const isPolitician = () => (
    <Select
        name="relacao_politica"
        label="Relação com a política"
        options={[
            {
                label: "Eleitor",
                value: "Eleitor",
            },
            {
                label: "Candidato",
                value: "Candidato",
            },
            {
                label: "Em atividade em cargo político",
                value: "Em atividade em cargo político",
            },
            {
                label: "Presidente de partido político",
                value: "Presidente de partido político",
            },
            {
                label: "Não informado",
                value: "Não informado",
            },
            {
                label: "Neutro",
                value: "Neutro",
            },
        ]}
    />
);

const havePublicJob = BooleanSelect("cargo_publico", "Possui cargo público?");

export const FilterInputs = [Id, Name, CreatedAt, UpdatedAt];

export const CreateInputs = [
    Name,
    Document,
    BirthDate,
    Genre,
    Email,
    EmailCommercial,
    MainPhone,
    SecondaryPhone,
    // State,
    // City,
    // District,
    // Address,
    AddressSection,
    // Number,
    // Complement,
    havePublicJob,
    isPolitician,
    Newsletter,
    Observation,
];

export const UpdateInputs = [
    Name,
    Document,
    BirthDate,
    Genre,
    Email,
    EmailCommercial,
    MainPhone,
    SecondaryPhone,
    // State,
    // City,
    // District,
    // Address,
    AddressSection,
    // Number,
    // Complement,
    havePublicJob,
    isPolitician,
    Newsletter,
    Observation,
];
