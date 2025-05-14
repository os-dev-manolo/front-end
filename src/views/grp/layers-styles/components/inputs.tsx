import { useEffect, useState } from "react";
import { DatePicker, Input, Select } from "../../../../components/global";
import { SelectOptions } from "../../../../shared/interfaces/ISelectOptions";
import { useLayers } from "../../../../shared/hooks/providers/useLayers";

const Id = () => <Input name="id" type="number" label="Código" />;

const Name = () => (
    <Input name="cames_nome" type="text" label="Nome do estilo" />
);

const GeoserverName = () => (
    <Input
        name="cames_nome_geoserver"
        type="text"
        label="Nome do estilo geoserver"
    />
);

const Layer = () => {
    const { getManagerLayersAsOptions } = useLayers();

    const [options, setOptions] = useState<SelectOptions[]>([]);

    useEffect(() => {
        (async () => {
            const layersOptions = await getManagerLayersAsOptions();

            setOptions(layersOptions);
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Select
            name="cam_id"
            label="Camada relacionada"
            options={options}
            isClearable
        />
    );
};

const CreatedAt = () => <DatePicker name="created_at" label="Criado em" />;

const UpdatedAt = () => <DatePicker name="updated_at" label="Atualizado em" />;

export const FilterInputs = [
    Id,
    Name,
    GeoserverName,
    Layer,
    CreatedAt,
    UpdatedAt,
];

export const CreateInputs = [Name, GeoserverName, Layer];

export const UpdateInputs = [Name, GeoserverName, Layer];
