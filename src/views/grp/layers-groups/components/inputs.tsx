import { DatePicker, Input } from "../../../../components/global";

const Id = () => <Input name="id" type="number" label="Código" />;

const Name = () => (
    <Input name="grpcam_nome" type="text" label="Nome do grupo" />
);

const Order = () => <Input name="grpcam_ordem" type="number" label="Ordem" />;
const CreatedAt = () => <DatePicker name="created_at" label="Criado em" />;

const UpdatedAt = () => <DatePicker name="updated_at" label="Atualizado em" />;

export const FilterInputs = [Id, Name, CreatedAt, UpdatedAt];

export const CreateInputs = [Name, Order];

export const UpdateInputs = [Name, Order];
