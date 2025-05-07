import { Input } from "../../../../components/global";
import { SingleDatePicker } from "../../../../components/global/single-date-picker";

const Id = () => <Input name="id" type="number" label="Id" />;

const Name = () => (
    <Input name="nome_cargo" type="text" label="Nome do cargo" />
);
const Description = () => (
    <Input name="descricao_cargo" type="text" label="Descrição do cargo" />
);

const UpdatedAt = () => (
    <SingleDatePicker name="atualizado_em" label="Registro atualizado em" />
);
export const FilterInputs = [Name, Description, UpdatedAt];

export const CreateInputs = [Name, Description];

export const UpdateInputs = [Name, Description];
