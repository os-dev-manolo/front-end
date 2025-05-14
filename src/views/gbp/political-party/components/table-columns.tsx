import Masks from "../../../../shared/utils/mask.utils";

import {
    DeleteAction,
    EditAction,
} from "../../../../components/page-releated/grp-standard-screen/actions";
import { ActionsButtonsEnum } from "../../../../shared/enums/actions-buttons.enum";
import { StandardGbpColumns } from "../../../../layout/gbp-standard-screen";
import { PoliticalParty } from "../../../../shared/interfaces/IPoliticalChains";

const tableColumns: StandardGbpColumns<PoliticalParty> = ({
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
        key: "political-party-name",
        dataKey: "nome",
        name: "Nome do partido",
        headerClick: columnClick,
    },
    {
        key: "short-party-name",
        dataKey: "sigla",
        name: "Sigla do partido",
        headerClick: columnClick,
    },
    {
        key: "main_color",
        dataKey: "cor_principal",
        name: "Cor Principal",
        headerClick: columnClick,
    },
    {
        key: "secondary_color",
        dataKey: "cor_secundaria",
        name: "Cor Secundária",
        headerClick: columnClick,
    },
    {
        key: "ano_criacao",
        dataKey: "ano_criacao",
        name: "Ano de criação",
        headerClick: columnClick,
    },
    {
        key: "coligacao.nome",
        dataKey: "coligacao",
        name: "Coligação",
        render(value, record) {
            return record.coligacao?.nome;
        },
    },
    {
        key: "created_at",
        dataKey: "criado_em",
        name: "Registro criado em",
        render: (value) => Masks.date(value as unknown as string),
        headerClick: columnClick,
    },
    {
        key: "updated_at",
        dataKey: "atualizado_em",
        name: "Registro atualizado em",
        render: (value) => Masks.date(value as unknown as string),
        headerClick: columnClick,
    },
];

export default tableColumns;
