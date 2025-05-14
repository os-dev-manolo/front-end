import { useEffect, useState } from "react";
import { DatePicker, Input, Select } from "../../../../components/global";
import { useRoles } from "../../../../shared/hooks/providers/useRoles";
import { SelectOptions } from "../../../../shared/interfaces/ISelectOptions";

const Id = () => <Input name="id" type="number" label="Código" />;

const Name = () => <Input name="usu_nome" type="text" label="Nome" />;

const Email = () => <Input name="usu_email" type="text" label="Email" />;

const Document = () => (
    <Input name="usu_cpfcnpj" type="text" label="CPF/CNPJ" />
);

const Password = () => <Input name="usu_senha" type="password" label="Senha" />;

const Active = () => (
    <Select
        name="usu_ativo"
        label="Ativo"
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

const Group = () => {
    const { getGroupsAsOptions } = useRoles();

    const [options, setOptions] = useState<SelectOptions[]>([]);

    useEffect(() => {
        (async () => {
            const rolesOptions = await getGroupsAsOptions();

            setOptions(rolesOptions);
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Select name="role_id" label="Grupo" options={options} isClearable />
    );
};

const Phone = () => <Input name="usu_telefone" type="text" label="Tel." />;

const CreatedAt = () => <DatePicker name="created_at" label="Criado em" />;

const UpdatedAt = () => <DatePicker name="updated_at" label="Atualizado em" />;

export const FilterInputs = {
    Id,
    Name,
    Email,
    Document,
    Active,
    Group,
    CreatedAt,
    UpdatedAt,
};

export const CreateInputs = {
    Name,
    Email,
    Password,
    Document,
    Active,
    Group,
    Phone,
};

export const UpdateInputs = {
    Name,
    Email,
    Document,
    Active,
    Group,
    Phone,
};
