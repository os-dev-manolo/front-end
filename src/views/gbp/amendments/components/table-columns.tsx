import Masks from "../../../../shared/utils/mask.utils";

import {
    DeleteAction,
    EditAction,
} from "../../../../components/page-releated/grp-standard-screen/actions";
import { ActionsButtonsEnum } from "../../../../shared/enums/actions-buttons.enum";
import { StandardGbpColumns } from "../../../../layout/gbp-standard-screen";
import { IAmendmentsResponse } from "../../../../shared/interfaces/IAmendments";

const tableColumns: StandardGbpColumns<IAmendmentsResponse> = ({
    columnClick,
    actionClick,
}) => [
    {
        key: "action",
        name: "Ações",
        dataKey: "id",
        render(id) {
            return (
                <div className="flex space-x-3.5">
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
    {
        key: "id",
        name: "Código",
        dataKey: "id",
        headerClick: columnClick,
    },
    {
        key: "proponente",
        name: "Proponente",
        dataKey: "proponente",
        headerClick: columnClick,
    },
    {
        key: "cnpj",
        name: "CNPJ",
        dataKey: "cnpj",
        headerClick: columnClick,
    },
    {
        key: "contato",
        name: "Contato",
        dataKey: "contato",
        headerClick: columnClick,
    },
    {
        key: "emenda",
        name: "Emenda",
        dataKey: "emenda",
        headerClick: columnClick,
    },
    {
        key: "numero_emenda",
        name: "Nº Emenda",
        dataKey: "numero_emenda",
        headerClick: columnClick,
    },
    {
        key: "ano_emenda",
        name: "Ano Emenda",
        dataKey: "ano_emenda",
        headerClick: columnClick,
    },
    {
        key: "situacao",
        name: "Situação",
        dataKey: "situacao",
        headerClick: columnClick,
    },
    {
        key: "tipo",
        name: "Tipo",
        dataKey: "tipo",
        headerClick: columnClick,
    },
    {
        key: "indicacao",
        name: "Indicação",
        dataKey: "indicacao",
        headerClick: columnClick,
    },
    {
        key: "created_at",
        dataKey: "criado_em",
        name: "Criado em",
        render: (value) => Masks.date(value as string),
        headerClick: columnClick,
    },
    {
        key: "updated_at",
        dataKey: "atualizado_em",
        name: "Atualizado em",
        render: (value) => Masks.date(value as string),
        headerClick: columnClick,
    },
];

export default tableColumns;
