import { DatePicker, Input } from "../../../../components/global";

const Id = () => <Input name="id" type="number" label="Código" />;

const Description = () => (
    <Input name="role_descricao" type="text" label="Descrição" />
);

const CreatedAt = () => <DatePicker name="created_at" label="Criado em" />;

const UpdatedAt = () => <DatePicker name="updated_at" label="Atualizado em" />;

export const FilterInputs = [Id, Description, CreatedAt, UpdatedAt];

export const CreateInputs = [Description];

export const UpdateInputs = [Description];
