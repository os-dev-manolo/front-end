import Masks from "../../../../shared/utils/mask.utils";

import {
    DeleteAction,
    EditAction,
} from "../../../../components/page-releated/grp-standard-screen/actions";
import { ActionsButtonsEnum } from "../../../../shared/enums/actions-buttons.enum";
import { StandardGbpColumns } from "../../../../layout/gbp-standard-screen";
import { Official } from "../../../../shared/interfaces/IPoliticalChains";

const tableColumns: StandardGbpColumns<Official> = ({
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
        key: "official-name",
        name: "Nome do Cargo",
        dataKey: "nome",
        headerClick: columnClick,
    },
    {
        key: "official-description",
        name: "Poder",
        dataKey: "poder",
        headerClick: columnClick,
    },
    {
        key: "updated_at",
        dataKey: "nivel",
        name: "Nivel",
        headerClick: columnClick,
    },
];

export default tableColumns;
