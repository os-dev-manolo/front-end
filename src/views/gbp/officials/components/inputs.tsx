import { Input, Select } from "../../../../components/global";
import { SingleDatePicker } from "../../../../components/global/event-date-picker";

// Campos individuais
const Id = () => <Input name="id" type="number" label="Id" />;

const Nome = () => <Input name="nome" type="text" label="Nome do cargo" />;

const Poder = () => (
    <Select
        name="poder"
        label="Poder"
        options={[
            { label: "Executivo", value: "Executivo" },
            { label: "Legislativo", value: "Legislativo" },
            { label: "Judiciário", value: "Judiciário" },
            { label: "Partidário", value: "Partidário" },
            { label: "Outro", value: "Outro" },
        ]}
    />
);

const Nivel = () => (
    <Select
        name="nivel"
        label="Nível"
        options={[
            { label: "Federal", value: "Federal" },
            { label: "Estadual", value: "Estadual" },
            { label: "Municipal", value: "Municipal" },
            { label: "Distrital", value: "Distrital" },
        ]}
    />
);

const Tipo = () => (
    <Select
        name="tipo"
        label="Tipo de cargo"
        options={[
            { label: "Eletivo", value: "Eletivo" },
            { label: "Nomeado", value: "Nomeado" },
            { label: "Comissionado", value: "Comissionado" },
            { label: "Partidário", value: "Partidário" },
            { label: "Outro", value: "Outro" },
        ]}
    />
);

const Observacoes = () => (
    <Input name="observacoes" type="text" label="Observações" />
);

const AtualizadoEm = () => (
    <SingleDatePicker name="atualizado_em" label="Registro atualizado em" />
);

// Exposição de grupos de campos
export const FilterInputs = [Nome, Poder, Nivel, Tipo, AtualizadoEm];
export const CreateInputs = [Nome, Poder, Nivel, Tipo, Observacoes];
export const UpdateInputs = [Nome, Poder, Nivel, Tipo, Observacoes];
