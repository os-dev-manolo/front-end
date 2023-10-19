import Masks from "../../../../shared/utils/mask.utils";

import { ILayersStyles } from "../../../../shared/interfaces/ILayers";
import { StandardGrpColumns } from "../../../../layout/grp-standard-screen";
import { DefaultActions } from "../../../../components/page-releated/grp-standard-screen/actions";

const tableColumns: StandardGrpColumns<ILayersStyles> = ({
    actionClick,
    columnClick,
}) => [
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
        headerClick: columnClick,
    },
    {
        key: "cames_nome",
        name: "Nome do estilo",
        dataKey: "cames_nome",
        headerClick: columnClick,
    },
    {
        key: "cames_nome_geoserver",
        name: "Nome do estilo geoserver",
        dataKey: "cames_nome_geoserver",
        headerClick: columnClick,
    },
    {
        key: "cam_id",
        name: "Camada relacionada",
        dataKey: "cam_id",
        render(value, record) {
            return record.layers?.cam_desc_webgeo;
        },
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
