import Masks from "../../../../shared/utils/mask.utils";

import {
    DeleteAction,
    EditAction,
} from "../../../../components/page-releated/grp-standard-screen/actions";
import { ActionsButtonsEnum } from "../../../../shared/enums/actions-buttons.enum";
import { StandardGbpColumns } from "../../../../layout/gbp-standard-screen";
import { Politic } from "../../../../shared/interfaces/IPoliticalChains";

const tableColumns: StandardGbpColumns<Politic> = ({
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
        key: "pessoa.name",
        dataKey: "pessoa",
        name: "Nome",
        render(value, record) {
            return record.pessoa?.nome;
        },
    },
    {
        key: "political-job",
        dataKey: "cargo_politico",
        name: "Cargo Político",
        headerClick: columnClick,
    },
    {
        key: "political-party.name",
        dataKey: "partido",
        name: "Partido",
        render(value, record) {
            return record.partido?.nome;
        },
    },
    {
        key: "pessoa-birth-date",
        dataKey: "pessoa",
        name: "Nascimento",
        render(value, record) {
            return record.pessoa?.nascimento
                ? Masks.date(record.pessoa?.nascimento.toString())
                : record.pessoa?.nascimento.toString();
        },
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
