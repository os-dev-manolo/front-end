import { useEffect, useState } from "react";
import {
    CurrencyInput,
    Input,
    InputMask,
    Select,
} from "../../../../components/global";
import { useProjects } from "../../../../shared/hooks/providers/useProjects";
import { SelectOptions } from "../../../../shared/interfaces/ISelectOptions";

export const Trackers = ({ onChange }: { onChange(value: number): void }) => {
    const { getAllTrackers } = useProjects();

    const [options, setOptions] = useState<SelectOptions[]>([]);

    useEffect(() => {
        (async () => {
            const trackerOptions = (await getAllTrackers()).map((tracker) => ({
                label: tracker.name,
                value: tracker.id,
            }));

            setOptions(trackerOptions);
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Select
            name="tracker"
            label="Tipo"
            options={options}
            onChange={(value) =>
                onChange((value as { label: string; value: number }).value)
            }
        />
    );
};

export const Work = () => (
    <Input name="work" label="Obra" className="form-input" />
);

export const Street = () => (
    <Input name="street" label="Rua" className="form-input" />
);

export const Zipcode = () => (
    <InputMask
        name="zipcode"
        label="CEP"
        className="form-input"
        mask="99999-999"
    />
);

export const Number = () => (
    <Input
        name="number"
        label="N. Predial"
        className="form-input"
        type="number"
        maxLength={5}
    />
);

export const Secretary = () => (
    <Input name="secretary" label="Secretaria" className="form-input" />
);

export const Cnpj = () => (
    <InputMask
        mask="99.999.999/0001-99"
        name="cnpj"
        label="CNPJ"
        className="form-input"
    />
);

export const Ressource = () => (
    <Input name="ressource" label="Fonte de recurso" className="form-input" />
);

export const Value = () => (
    <CurrencyInput name="value" label="Valor estimado do investimento" />
);

export const CounterpartValue = () => (
    <CurrencyInput name="counterpartValue" label="Valor de contrapartida" />
);

export const Description = () => (
    <Input name="description" label="Descrição" className="form-input" />
);
