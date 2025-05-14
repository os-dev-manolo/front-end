import { Input, Select } from "../../../../components/global";
import { SingleDatePicker } from "../../../../components/global/single-date-picker";

const Id = () => <Input name="id" type="number" label="Id" />;

const YearCreation = () => (
    <Input name="ano_criacao" type="text" label="Ano de criação" />
);

const CreatedAt = () => (
    <SingleDatePicker name="criado_em" label="Registro criado em" />
);

const UpdatedAt = () => (
    <SingleDatePicker name="atualizado_em" label="Registro atualizado em" />
);

const Name = () => <Input name="nome" type="text" label="Nome" />;

const IndicationSelect = () => (
    <Select
        name="indicacao"
        label="Indicação"
        options={[
            {
                label: "Opcional/Todas",
                value: "Opcional/Todas",
            },
            {
                label: "Indicadas",
                value: "Indicada",
            },
            {
                label: "Desindicadas",
                value: "Desindicadas",
            },
        ]}
    />
);

const SituationSelect = () => (
    <Select
        name="situacao"
        label="Situação"
        options={[
            {
                label: "Aguardando Atendimento",
                value: "Aguardando Atendimento",
            },
            {
                label: "Em Andamento",
                value: "Em Andamento",
            },
            {
                label: "Liquidada (Paga)",
                value: "Liquidada (Paga)",
            },
            {
                label: "Não Atendida",
                value: "Não Atendida",
            },
            {
                label: "Atendida Parcialmente",
                value: "Atendida Parcialmente",
            },
            {
                label: "Empenhada",
                value: "Empenhada",
            },
            {
                label: "Cancelada",
                value: "Cancelada",
            },
            {
                label: "Proposta Aprovada",
                value: "Proposta Aprovada",
            },
            {
                label: "Conveniada",
                value: "Conveniada",
            },
            {
                label: "Contratada",
                value: "Contratada",
            },
            {
                label: "Pago parcialmente",
                value: "Pago parcialmente",
            },
            {
                label: "Atendida",
                value: "Atendida",
            },
            {
                label: "Requerimento",
                value: "Requerimento",
            },
        ]}
    />
);

const TypeSelect = () => (
    <Select
        name="tipo"
        label="Tipo"
        options={[
            {
                label: "Individual",
                value: "Individual",
            },
            {
                label: "Extra Orçamantaria",
                value: "Extra Orçamantaria",
            },
            {
                label: "Bancada/Comissão",
                value: "Bancada/Comissão",
            },
        ]}
    />
);

export const FilterInputs = [Id, Name, YearCreation, CreatedAt, UpdatedAt];

export const CreateInputs = [Name, YearCreation];

export const UpdateInputs = [Name, YearCreation];
