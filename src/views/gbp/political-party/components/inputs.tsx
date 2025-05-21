import { useEffect, useState } from "react";
import { Input, Select } from "../../../../components/global";
import { SingleDatePicker } from "../../../../components/global/event-date-picker";
import { PoliticalChain } from "../../../../shared/interfaces/IPoliticalChains";
import { SelectOptions } from "../../../../shared/interfaces/ISelectOptions";
import { StandardGbpApiService } from "../../../../shared/services/api/standard-gbp-api.service";

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

const ShortName = () => <Input name="sigla" type="text" label="Sigla" />;

const CreatedAt = () => (
    <SingleDatePicker name="criado_em" label="Registro criado em" />
);

const UpdatedAt = () => (
    <SingleDatePicker name="atualizado_em" label="Registro atualizado em" />
);

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

export const FilterInputs = [
    Id,
    Name,
    ShortName,
    PrimaryColor,
    SecondaryColor,
    YearCreation,
    CreatedAt,
    UpdatedAt,
];

export const CreateInputs = [
    Name,
    ShortName,
    PrimaryColor,
    SecondaryColor,
    Coalition,
    YearCreation,
];

export const UpdateInputs = [
    Name,
    ShortName,
    PrimaryColor,
    SecondaryColor,
    Coalition,
    YearCreation,
];

export const PartyInputs = [
    Name,
    ShortName,
    PrimaryColor,
    SecondaryColor,
    YearCreation,
];
