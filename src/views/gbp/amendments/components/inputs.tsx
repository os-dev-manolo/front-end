import { Input, Select } from "../../../../components/global";
import { SingleDatePicker } from "../../../../components/global/event-date-picker";

const Id = () => <Input name="id" type="number" label="Id" />;

const Contact = () => <Input name="contato" type="text" label="Contato" />;

const Proponent = () => (
    <Input name="proponente" type="text" label="Proponente" />
);

const Amendment = () => <Input name="emenda" type="text" label="Emenda" />;

const NumberAmendment = () => (
    <Input name="numero_emenda" type="text" label="Nº Emenda" />
);
const YearAmendment = () => (
    <Input name="ano_emenda" type="text" label="Ano Emenda" />
);
const Document = () => <Input name="cnpj" type="text" label="CNPJ" />;

const OrgAction = () => (
    <Input name="orgao_acao" type="text" label="Orgão Ação" />
);

const City = () => <Input name="cidade" type="text" label="Cidade" />;

const MicroRegion = () => (
    <Input name="microrregiao" type="text" label="Microrregiao" />
);

const EstimatedValue = () => (
    <Input name="valor_estimado" type="number" label="Valor Estimado" />
);

const CreatedAt = () => <SingleDatePicker name="criado_em" label="Criado em" />;

const UpdatedAt = () => (
    <SingleDatePicker name="atualizado_em" label="Atualizado em" />
);

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

export const FilterInputs = [
    Id,
    Proponent,
    Document,
    Amendment,
    Contact,
    IndicationSelect,
    NumberAmendment,
    SituationSelect,
    OrgAction,
    TypeSelect,
    CreatedAt,
    UpdatedAt,
    YearAmendment,
    City,
    MicroRegion,
    EstimatedValue,
];

export const CreateInputs = [
    Proponent,
    Document,
    Amendment,
    Contact,
    IndicationSelect,
    NumberAmendment,
    SituationSelect,
    OrgAction,
    TypeSelect,
    YearAmendment,
    City,
    MicroRegion,
    EstimatedValue,
    CreatedAt,
];

export const UpdateInputs = [
    Proponent,
    Document,
    Amendment,
    Contact,
    IndicationSelect,
    NumberAmendment,
    SituationSelect,
    OrgAction,
    TypeSelect,
    YearAmendment,
    City,
    MicroRegion,
    EstimatedValue,
];
