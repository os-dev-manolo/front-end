import Masks from "../../../../shared/utils/mask.utils";

import {
    DeleteAction,
    EditAction,
    DetailsAction,
} from "../../../../components/page-releated/grp-standard-screen/actions";
import { ActionsButtonsEnum } from "../../../../shared/enums/actions-buttons.enum";
import { StandardGbpColumns } from "../../../../layout/gbp-standard-screen";
import { IAmendmentsApiResponse } from "../../../../shared/interfaces/IAmendmentsApi";

const tableColumns: StandardGbpColumns<IAmendmentsApiResponse> = ({
    columnClick,
    actionClick,
}) => [
    {
        key: "action",
        name: "Ações",
        dataKey: "id",
        k: "id",
        render(id) {
            return (
                <div className="flex space-x-3.5">
                    <DetailsAction
                        doAfterClick={(id_) =>
                            actionClick(ActionsButtonsEnum.DETAILS, Number(id_))
                        }
                        value={id as unknown as number}
                    />
                    <EditAction
                        doAfterClick={(id_) =>
                            actionClick(ActionsButtonsEnum.EDIT, Number(id_))
                        }
                        value={id as unknown as number}
                    />
                    <DeleteAction
                        doAfterClick={(id_) =>
                            actionClick(ActionsButtonsEnum.DELETE, Number(id_))
                        }
                        value={id as unknown as number}
                    />
                </div>
            );
        },
    },
    // {
    //     key: "id",
    //     k: "id",
    //     name: "Id",
    //     dataKey: "id",
    //     headerClick: columnClick,
    // },
    {
        key: "codigo_emenda",
        k: "codigo_emenda",
        name: "Código",
        dataKey: "codigo_emenda",
        headerClick: columnClick,
    },
    {
        key: "ano",
        k: "ano",
        name: "Ano",
        dataKey: "ano",
        width: "50",
        headerClick: columnClick,
    },
    {
        key: "tipo_emenda",
        name: "Tipo de Emenda",
        dataKey: "tipo_emenda",
        width: "200",
        k: "tipo_emenda",
        headerClick: columnClick,
    },
    {
        key: "autor",
        k: "autor",
        name: "Autor",
        dataKey: "autor",
        headerClick: columnClick,
    },
    {
        key: "nome_autor",
        k: "nome_autor",
        name: "Nome Autor",
        dataKey: "nome_autor",
        headerClick: columnClick,
    },
    {
        key: "numero_emenda",
        k: "numero_emenda",
        name: "Número",
        dataKey: "numero_emenda",
        render: (value) => Masks.formatToFourDigits(value as string),
        headerClick: columnClick,
    },
    {
        key: "localidade_do_gasto",
        k: "localidade_do_gasto",
        name: "Localidade do Gasto (Regionalização)",
        dataKey: "localidade_do_gasto",
        width: "100",
        headerClick: columnClick,
    },
    {
        key: "funcao",
        k: "funcao",
        name: "Função",
        dataKey: "funcao",
        width: "100",
        headerClick: columnClick,
    },
    {
        key: "subfuncao",
        k: "subfuncao",
        name: "Subfunção",
        dataKey: "subfuncao",
        width: "100",
        headerClick: columnClick,
    },
    {
        key: "programa",
        k: "programa",
        name: "Programa Orçamentário",
        dataKey: "programa",
        headerClick: columnClick,
    },
    {
        key: "acao",
        k: "acao",
        name: "Ação Orçamentária",
        dataKey: "acao",
        headerClick: columnClick,
    },
    {
        key: "plano",
        k: "plano",
        name: "Plano Orçamentário",
        dataKey: "plano",
        headerClick: columnClick,
    },
    {
        key: "valor_empenhado",
        k: "valor_empenhado",
        name: "Valor Empenhado",
        dataKey: "valor_empenhado",
        width: "100",
        render: (value) => Masks.currency(value as string),
        headerClick: columnClick,
    },
    {
        key: "valor_liquidado",
        k: "valor_liquidado",
        name: "Valor Liquidado",
        dataKey: "valor_liquidado",
        width: "100",
        render: (value) => Masks.currency(value as string),
        headerClick: columnClick,
    },
    {
        key: "valor_pago",
        k: "valor_pago",
        name: "Valor Pago",
        dataKey: "valor_pago",
        width: "100",
        render: (value) => Masks.currency(value as string),
        headerClick: columnClick,
    },
    {
        key: "valor_resto_inscrito",
        k: "valor_resto_inscrito",
        name: "Valor Restos a Pagar Inscritos",
        dataKey: "valor_resto_inscrito",
        width: "100",
        render: (value) => Masks.currency(value as string),
        headerClick: columnClick,
    },
    {
        key: "valor_resto_cancelado",
        k: "valor_resto_cancelado",
        name: "Valor Restos a Pagar Cancelados",
        dataKey: "valor_resto_cancelado",
        width: "100",
        render: (value) => Masks.currency(value as string),
        headerClick: columnClick,
    },
    {
        key: "valor_resto_pago",
        k: "valor_resto_pago",
        name: "Valor Restos a Pagar Pagos",
        dataKey: "valor_resto_pago",
        width: "100",
        render: (value) => Masks.currency(value as string),
        headerClick: columnClick,
    },
    // {
    //     key: "created_at",
    //     dataKey: "criado_em",
    //     name: "Criado em",
    //     render: (value) => Masks.date(value as string),
    //     headerClick: columnClick,
    // },
    // {
    //     key: "updated_at",
    //     dataKey: "atualizado_em",
    //     name: "Atualizado em",
    //     render: (value) => Masks.date(value as string),
    //     headerClick: columnClick,
    // },
];

export default tableColumns;
