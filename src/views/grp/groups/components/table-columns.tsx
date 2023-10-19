import Masks from "../../../../shared/utils/mask.utils";
import { IRolesResponse } from "../../../../shared/interfaces/IRoles";

import { type StandardGrpColumns } from "../../../../layout/grp-standard-screen";
import {
    DeleteAction,
    EditAction,
} from "../../../../components/page-releated/grp-standard-screen/actions";
import { ActionsButtonsEnum } from "../../../../shared/enums/actions-buttons.enum";

const tableColumns: StandardGrpColumns<IRolesResponse> = ({
    columnClick,
    actionClick,
}) => [
    {
        key: "action",
        name: "Código",
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
        key: "role_descricao",
        name: "Nome",
        dataKey: "role_descricao",
        headerClick: columnClick,
    },
    {
        key: "created_at",
        dataKey: "created_at",
        name: "Criado em",
        render: (value) => Masks.date(value as string),
        headerClick: columnClick,
    },
    {
        key: "updated_at",
        dataKey: "updated_at",
        name: "Atualizado em",
        render: (value) => Masks.date(value as string),
        headerClick: columnClick,
    },
];

export default tableColumns;
