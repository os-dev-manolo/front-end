import { useState, useEffect } from "react";
import { Checkbox } from "../../../../../components/global";
import { Input, InputMultiLined } from "../../../../../components/global/input";
import { Select } from "../../../../../components/global/select";
import { SingleDatePicker } from "../../../../../components/global/single-date-picker";
import {
    PoliticalChain,
    PoliticalParty,
} from "../../../../../shared/interfaces/IPoliticalChains";
import { SelectOptions } from "../../../../../shared/interfaces/ISelectOptions";
import { StandardGbpApiService } from "../../../../../shared/services/api/standard-gbp-api.service";

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

const Document = () => <Input name="cpf" type="text" label="CPF" />;

const Cep = () => <Input name="cep" type="text" label="Cep" />;

const State = () => <Input name="estado" type="text" label="Estado" />;

const City = () => <Input name="cidade" type="text" label="Cidade" />;

const District = () => <Input name="bairro" type="text" label="Bairro" />;

const Number = () => <Input name="numero" type="text" label="Número" />;

const Complement = () => (
    <Input name="complemento" type="text" label="Complemento" />
);

const Address = () => <Input name="endereco" type="text" label="Endereço" />;

const Region = () => <Input name="regiao" type="text" label="Região" />;

const MicroRegion = () => (
    <Input name="microrregiao" type="text" label="Microrregião" />
);

const MainPhone = () => (
    <Input name="telefone_principal" type="text" label="Telefone principal" />
);

const SecondaryPhone = () => (
    <Input name="telefone_secundario" type="text" label="Telefone secundário" />
);

const CreatedAt = () => (
    <SingleDatePicker name="criado_em" label="Registro criado em" />
);

const UpdatedAt = () => (
    <SingleDatePicker name="atualizado_em" label="Registro atualizado em" />
);

const Coallation = () => {
    const [options, setOptions] = useState<SelectOptions[]>([]);

    const convertOptions = async (opts: PoliticalChain[]) => {
        const selectOptions: SelectOptions[] = [];

        opts.forEach((element: PoliticalChain) => {
            const option: SelectOptions = {
                label: element.nome,
                value: element.id,
            };
            selectOptions.push(option);
        });
        return selectOptions;
    };

    useEffect(() => {
        (async () => {
            const polticalChains =
                await StandardGbpApiService.get<PoliticalChain>({
                    path: "crud/correntes-politicas",
                    params: {},
                });

            const op = await convertOptions(polticalChains.data);
            setOptions(op);
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Select
            name="id_coligacao"
            label="Coligação"
            options={options}
            isClearable
        />
    );
};
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
    State,
    City,
    District,
    Address,
    Number,
    Complement,
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
    State,
    City,
    District,
    Address,
    Number,
    Complement,
    havePublicJob,
    isPolitician,
    Newsletter,
    Observation,
];
