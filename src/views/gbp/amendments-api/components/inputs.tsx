import { useState, useEffect } from "react";
import { Input, Select } from "../../../../components/global";
import { InputMultiLined } from "../../../../components/global/input";
import { StandardGbpApiService } from "../../../../shared/services/api/standard-gbp-api.service";

const Id = () => <Input name="id" type="number" label="Id" />;

const Code = () => (
    <Input name="codigo_emenda" type="text" label="Código da Emenda" />
);

interface IAmendmentsApiResponse {
    tipo_emenda: string;
}

interface SelectOptions {
    label: string;
    value: string;
}

const TypeFromApi = () => {
    const [options, setOptions] = useState<SelectOptions[]>([]);

    const convertOptions = (opts: IAmendmentsApiResponse[]): SelectOptions[] =>
        opts.map((element) => ({
            label: element.tipo_emenda,
            value: element.tipo_emenda,
        }));

    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const response =
                    await StandardGbpApiService.get<IAmendmentsApiResponse>({
                        path: "crud/emendas-api/tipo_emenda",
                        params: {},
                    });

                setOptions(convertOptions(response.data));
            } catch (err) {
                console.error("Erro ao buscar tipo de emenda:", err);
            }
        };

        fetchOptions();
    }, []);

    return (
        <Select
            name="tipo_emenda"
            label="Tipo de Emenda"
            options={options}
            isClearable
        />
    );
};

const Type = () => (
    <Select
        name="tipo_emenda"
        label="Tipo de Emenda"
        options={[
            { label: "Emenda de Bancada", value: "Emenda de Bancada" },
            { label: "Emenda de Comissão", value: "Emenda de Comissão" },
            { label: "Emenda de Relator", value: "Emenda de Relator" },
            {
                label: "Emenda Individual - Transferências com Finalidade Definida",
                value: "Emenda Individual - Transferências com Finalidade Definida",
            },
            {
                label: "Emenda Individual - Transferências Especiais",
                value: "Emenda Individual - Transferências Especiais",
            },
        ]}
    />
);

const TypeWithData = () => (
    <Input name="tipo_emenda" type="text" label="Tipo de Emenda" />
);

const Author = () => <Input name="autor" type="text" label="Autor" />;

const Name = () => (
    <Input name="nome_autor" type="text" label="Nome do Autor" />
);

const Number = () => (
    <Input name="numero_emenda" type="text" label="Número da Emenda" />
);

const Place = () => (
    <Input
        name="localidade_do_gasto"
        type="text"
        label="Localidade do Gasto (Regionalização)"
    />
);

const Function = () => <Input name="funcao" type="text" label="Função" />;

const SubFunction = () => (
    <Input name="subfuncao" type="text" label="Subfunção" />
);

const ReservedValue = () => (
    <Input
        name="valor_empenhado"
        type="text"
        label="Valor da Emenda (Empenhado)"
        placeholder="Ex: 1.000.000,00"
    />
);

const VerifiedValue = () => (
    <Input
        name="valor_liquidado"
        type="text"
        label="Valor da Emenda (Liquidado)"
        placeholder="Ex: 1.000.000,00"
    />
);

const PaidValue = () => (
    <Input
        name="valor_pago"
        type="text"
        label="Valor da Emenda (Pago)"
        placeholder="Ex: 1.000.000,00"
    />
);

const RestValue = () => (
    <Input
        name="valor_resto_inscrito"
        type="text"
        label="Valor Restos a Pagar Inscritos"
        placeholder="Ex: 1.000.000,00"
    />
);

const RestCancelledValue = () => (
    <Input
        name="valor_resto_cancelado"
        type="text"
        label="Valor Restos a Pagar Cancelados"
        placeholder="Ex: 1.000.000,00"
    />
);

const RestPaidValue = () => (
    <Input
        name="valor_resto_pago"
        type="text"
        label="Valor Restos a Pagar Pagos"
        placeholder="Ex: 1.000.000,00"
    />
);

const Plan = () => (
    <InputMultiLined name="plano" type="text" label="Plano Orçamentário" />
);
const Action = () => (
    <InputMultiLined name="acao" type="text" label="Ação Orçamentária" />
);
const Program = () => (
    <InputMultiLined
        name="programa"
        type="text"
        label="Programa Orçamentário"
    />
);

const Year = () => <Input name="ano" type="text" label="Ano da Emenda" />;

const Values = () => (
    <>
        <Input
            name="valor_empenhado"
            type="text"
            label="Valor da Emenda (Empenhado)"
            placeholder="Ex: 1.000.000,00"
        />
        <Input
            name="valor_liquidado"
            type="text"
            label="Valor da Emenda (Liquidado)"
            placeholder="Ex: 1.000.000,00"
        />
        <Input
            name="valor_pago"
            type="text"
            label="Valor da Emenda (Pago)"
            placeholder="Ex: 1.000.000,00"
        />
        <Input
            name="valor_resto_inscrito"
            type="text"
            label="Valor Restos a Pagar Inscritos"
            placeholder="Ex: 1.000.000,00"
        />
        <Input
            name="valor_resto_cancelado"
            type="text"
            label="Valor Restos a Pagar Cancelados"
            placeholder="Ex: 1.000.000,00"
        />
        <Input
            name="valor_resto_pago"
            type="text"
            label="Valor Restos a Pagar Pagos"
            placeholder="Ex: 1.000.000,00"
        />
    </>
);
export const CreateInputs = [
    Author,
    Name,
    Type,
    Place,
    Year,
    Code,
    Number,
    Function,
    SubFunction,
    Values,
    Plan,
    Action,
    Program,
];
export const FilterInputs = [
    Id,
    Year,
    Code,
    Type,
    Author,
    Name,
    Number,
    Place,
    Function,
    SubFunction,
    ReservedValue,
    VerifiedValue,
    PaidValue,
    RestValue,
    RestCancelledValue,
    RestPaidValue,
    Plan,
    Action,
    Program,
];

export const UpdateInputs = [
    Year,
    Code,
    TypeFromApi,
    Author,
    Name,
    Number,
    Place,
    Function,
    SubFunction,
    ReservedValue,
    VerifiedValue,
    PaidValue,
    RestValue,
    RestCancelledValue,
    RestPaidValue,
    Plan,
    Action,
    Program,
];
