import Masks from "../../../../shared/utils/mask.utils";

import { ILayersGroups } from "../../../../shared/interfaces/ILayers";
import { type StandardGrpColumns } from "../../../../layout/grp-standard-screen";
import { DefaultActions } from "../../../../components/page-releated/grp-standard-screen/actions";

const tableColumns: StandardGrpColumns<ILayersGroups> = ({ actionClick }) => [
    {
        key: "action",
        name: "Ações",
        dataKey: "id",
        render(id) {
            return (
                <DefaultActions
                    value={id as unknown as number}
                    doAfterClick={actionClick}
                />
            );
        },
    },
    {
        key: "id",
        name: "Código",
        dataKey: "id",
    },
    {
        key: "grpcam_nome",
        name: "Nome",
        dataKey: "grpcam_nome",
    },
    {
        key: "grpcam_ordem",
        name: "Ordem",
        dataKey: "grpcam_ordem",
    },
    {
        key: "created_at",
        dataKey: "created_at",
        name: "Criado em",
        render: (value) => Masks.date(value as string),
    },
    {
        key: "updated_at",
        dataKey: "updated_at",
        name: "Atualizado em",
        render: (value) => Masks.date(value as string),
    },
];

export default tableColumns;
