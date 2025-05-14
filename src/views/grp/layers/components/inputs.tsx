import { useEffect, useState } from "react";
import { DatePicker, Input, Select } from "../../../../components/global";
import { SelectOptions } from "../../../../shared/interfaces/ISelectOptions";
import { useLayers } from "../../../../shared/hooks/providers/useLayers";

const BooleanSelect = (name: string, label: string) => () =>
    (
        <Select
            name={name}
            label={label}
            options={[
                {
                    label: "Habilitado",
                    value: "true",
                },
                {
                    label: "Desabilitado",
                    value: "false",
                },
            ]}
        />
    );

const Id = () => <Input name="id" type="number" label="Código" />;

const Name = () => (
    <Input
        name="cam_desc_webgeo"
        type="text"
        label="Nome descritivo no webgeo"
    />
);

const GeoserverName = () => (
    <Input
        name="cam_nome_geoserver"
        type="text"
        label="Nome registrado no geoserver"
    />
);

const Order = () => <Input name="cam_ordem" type="number" label="Ordem" />;

const Group = () => {
    const { getLayersGroupsAsOptions } = useLayers();

    const [options, setOptions] = useState<SelectOptions[]>([]);

    useEffect(() => {
        (async () => {
            const groupsOptions = await getLayersGroupsAsOptions();

            setOptions(groupsOptions);
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Select name="grpcam_id" label="Grupo" options={options} isClearable />
    );
};

const Bci = BooleanSelect("cam_ativa_bci", "BCI");
const ConsultaPrevia = BooleanSelect(
    "cam_ativa_consultaprevia",
    "Consulta prévia"
);
const Login = BooleanSelect("cam_ativa_login", "Login");
const Webgeo = BooleanSelect("cam_ativa_webgeo", "Webgeo");
const Cache = BooleanSelect("cam_cache", "Cache");

const CreatedAt = () => <DatePicker name="created_at" label="Criado em" />;

const UpdatedAt = () => <DatePicker name="updated_at" label="Atualizado em" />;

const Confrontante = BooleanSelect("cam_ativa_confrontante", "Confrontante");

export const FilterInputs = [
    Id,
    Name,
    GeoserverName,
    Group,
    Bci,
    ConsultaPrevia,
    Login,
    Webgeo,
    Cache,
    CreatedAt,
    UpdatedAt,
    Confrontante,
];

export const CreateInputs = [
    Name,
    GeoserverName,
    Group,
    Order,
    Bci,
    ConsultaPrevia,
    Login,
    Webgeo,
    Cache,
    Confrontante,
];

export const UpdateInputs = [
    Name,
    GeoserverName,
    Group,
    Order,
    Bci,
    ConsultaPrevia,
    Login,
    Webgeo,
    Cache,
    Confrontante,
];
