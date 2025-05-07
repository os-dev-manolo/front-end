import { useState, useEffect } from "react";
import { Input, Select } from "../../../../components/global";
import { SingleDatePicker } from "../../../../components/global/single-date-picker";
import {
    Politic,
    PoliticalChain,
} from "../../../../shared/interfaces/IPoliticalChains";
import { SelectOptions } from "../../../../shared/interfaces/ISelectOptions";
import { StandardGbpApiService } from "../../../../shared/services/api/standard-gbp-api.service";

const Name = () => <Input name="nome" type="text" label="Nome da cidade" />;

const Population = () => (
    <Input name="populacao" type="text" label="População" />
);

const Resume = () => <Input name="resumo" type="text" label="Resumo" />;

const LastVisit = () => (
    <Input name="ultima_visita" type="text" label="Última Visita" />
);

const UpdatedAt = () => (
    <SingleDatePicker name="atualizado_em" label="Registro atualizado em" />
);

const Mayor = () => {
    const [options, setOptions] = useState<SelectOptions[]>([]);

    const convertOptions = async (opts: Politic[]) => {
        const selectOptions: SelectOptions[] = [];

        opts.forEach((element: Politic) => {
            const option: SelectOptions = {
                label: element.pessoa.nome,
                value: element.id,
            };
            selectOptions.push(option);
        });
        return selectOptions;
    };

    useEffect(() => {
        (async () => {
            const politics = await StandardGbpApiService.get<Politic>({
                path: "crud/politico",
                relations: ["pessoa", "partido", "partido.coligacao"],
                params: {
                    where: JSON.stringify({
                        cargo_politico: "Prefeito Municipal",
                    }),
                },
            });
            const op = await convertOptions(politics.data);
            setOptions(op);
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Select
            name="prefeito"
            label="Prefeito"
            options={options}
            isClearable
        />
    );
};

export const FilterInputs = [
    Name,
    Resume,
    Population,
    Mayor,
    LastVisit,
    UpdatedAt,
];

export const CreateInputs = [Name, Resume, Population, Mayor, LastVisit];

export const UpdateInputs = [Name, Resume, Population, Mayor, LastVisit];
