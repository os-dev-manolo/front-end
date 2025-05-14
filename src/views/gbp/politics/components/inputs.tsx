import { useEffect, useState } from "react";
import { Input, Select } from "../../../../components/global";
import { SingleDatePicker } from "../../../../components/global/single-date-picker";
import { ActionsFormProps } from "../../../../components/page-releated/gbp-standard-screen/actions-form";
import { Person } from "../../../../shared/interfaces/IPerson";
import {
    Official,
    PoliticalChain,
    PoliticalParty,
} from "../../../../shared/interfaces/IPoliticalChains";
import { SelectOptions } from "../../../../shared/interfaces/ISelectOptions";
import { StandardGbpApiService } from "../../../../shared/services/api/standard-gbp-api.service";

export type RegisteredFields = {
    fields?: React.ReactNode;
    form?: React.FC<Omit<ActionsFormProps, "children">>;
    validator?(form: unknown): Promise<void>;
    parser?(form: unknown): unknown;
};

const Id = () => <Input name="id" type="number" label="Id" />;

const YearCreation = () => (
    <Input name="ano_criacao" type="text" label="Ano de criação" />
);

const PrimaryColor = () => (
    <Input name="cor_principal" type="text" label="Cor principal" />
);

const SecondaryColor = () => (
    <Input name="cor_secundaria" type="text" label="Cor secundária" />
);

const Name = () => <Input name="nome" type="text" label="Nome" />;

const CreatedAt = () => (
    <SingleDatePicker name="criado_em" label="Registro criado em" />
);

const UpdatedAt = () => (
    <SingleDatePicker name="atualizado_em" label="Registro atualizado em" />
);

export const Party = () => {
    const [options, setOptions] = useState<SelectOptions[]>([]);

    const convertOptions = async (opts: PoliticalParty[]) => {
        const selectOptions: SelectOptions[] = [];

        opts.forEach((element: PoliticalParty) => {
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
            const politicalParty =
                await StandardGbpApiService.get<PoliticalParty>({
                    path: "crud/partidos-politicos",
                    params: {},
                });

            const op = await convertOptions(politicalParty.data);
            setOptions(op);
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Select
            name="id_partido"
            label="Partido"
            options={options}
            isClearable
        />
    );
};
export const Persons = () => {
    const [options, setOptions] = useState<SelectOptions[]>([]);

    const convertOptions = async (opts: Person[]) => {
        const selectOptions: SelectOptions[] = [];

        opts.forEach((element: Person) => {
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
            const political = await StandardGbpApiService.get<Person>({
                path: "crud/pessoa-fisica",
                params: {},
            });

            const op = await convertOptions(political.data);
            setOptions(op);
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Select
            name="id_pessoa_fisica"
            label="Pessoa Física"
            options={options}
            isClearable
        />
    );
};
const Coalition = () => {
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
export const OfficialType = () => {
    const [options, setOptions] = useState<SelectOptions[]>([]);

    const convertOptions = async (opts: Official[]) => {
        const selectOptions: SelectOptions[] = [];

        opts.forEach((element: Official) => {
            const option: SelectOptions = {
                label: element.nome,
                value: element.nome,
            };
            selectOptions.push(option);
        });
        return selectOptions;
    };

    useEffect(() => {
        (async () => {
            const jobs = await StandardGbpApiService.get<Official>({
                path: "crud/cargo-politico",
                params: {},
            });

            const op = await convertOptions(jobs.data);
            setOptions(op);
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Select
            name="cargo_politico"
            label="Cargo político"
            options={options}
            isClearable
        />
    );
};

const PoliticalJobType = () => (
    <Select
        name="cargo_politico"
        label="Cargo político"
        options={[
            {
                label: "Presidente da República",
                value: "Presidente da República",
            },
            {
                label: "Senador da República",
                value: "Senador da República",
            },
            {
                label: "Governador Estadual",
                value: "Governador Estadual",
            },
            {
                label: "Deputado Federal",
                value: "Deputado Federal",
            },
            {
                label: "Deputado Estadual",
                value: "Deputado Estadual",
            },
            {
                label: "Prefeito Municipal",
                value: "Prefeito Municipal",
            },
            {
                label: "Vereador Municipal",
                value: "Vereador Municipal",
            },
        ]}
    />
);

export const FilterInputs = [Persons, OfficialType, Party];

export const CreateInputs = [Persons, OfficialType, Party];

export const UpdateInputs = [Persons, OfficialType, Party];
