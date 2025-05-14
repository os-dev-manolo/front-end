import Masks from "../../../../shared/utils/mask.utils";

import {
    DeleteAction,
    EditAction,
} from "../../../../components/page-releated/grp-standard-screen/actions";
import { ActionsButtonsEnum } from "../../../../shared/enums/actions-buttons.enum";
import { StandardGbpColumns } from "../../../../layout/gbp-standard-screen";
import { City } from "../../../../shared/interfaces/IPoliticalChains";

const tableColumns: StandardGbpColumns<City> = ({
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
        key: "city-name",
        name: "Nome da Cidade",
        dataKey: "cidade",
        headerClick: columnClick,
    },
    {
        key: "population-name",
        name: "População",
        dataKey: "populacao",
        headerClick: columnClick,
    },
    {
        key: "resume-name",
        name: "Resumo",
        dataKey: "resumo",
        headerClick: columnClick,
    },
    {
        key: "mayor-name",
        name: "Prefeito",
        dataKey: "prefeito",
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
