import {
    IoIosCheckmarkCircleOutline,
    IoIosCloseCircleOutline,
} from "react-icons/io";
import { DefaultActions } from "../../../../components/page-releated/grp-standard-screen/actions";
import { type StandardGrpColumns } from "../../../../layout/grp-standard-screen";

import { ILayers, ILayersStyles } from "../../../../shared/interfaces/ILayers";
import Masks from "../../../../shared/utils/mask.utils";

const renderBoolIcon = (bool: boolean) => {
    return bool ? (
        <IoIosCheckmarkCircleOutline size={24} color="green" />
    ) : (
        <IoIosCloseCircleOutline size={24} color="red" />
    );
};

const tableColumns: StandardGrpColumns<ILayers> = ({
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
        key: "cam_desc_webgeo",
        name: "Nome descritivo no webgeo",
        dataKey: "cam_desc_webgeo",
        headerClick: columnClick,
    },
    {
        key: "cam_nome_geoserver",
        name: "Nome registrado no geoserve",
        dataKey: "cam_nome_geoserver",
        headerClick: columnClick,
    },
    {
        key: "grpcam_id",
        name: "Grupo",
        dataKey: "grpcam_id",
        headerClick: columnClick,
        render(value, record) {
            return record.group?.grpcam_nome;
        },
    },
    {
        key: "layer_styles",
        name: "Estilos",
        dataKey: "styles",
        headerClick: columnClick,
        render(value) {
            return (
                <>
                    {(value as ILayersStyles[]).map((style) => (
                        <p>{style.cames_nome_geoserver}</p>
                    ))}
                </>
            );
        },
    },
    {
        key: "cam_ativa_bci",
        name: "Exibições",
        dataKey: "cam_ativa_bci",
        headerClick: columnClick,
        render(value, record) {
            return (
                <ul>
                    <li className="flex flex-row">
                        Login {renderBoolIcon(!!record.cam_ativa_login)}
                    </li>
                    <li className="flex flex-row">
                        Bci {renderBoolIcon(!!record.cam_ativa_bci)}
                    </li>
                    <li className="flex flex-row">
                        Cons. Prévia{" "}
                        {renderBoolIcon(!!record.cam_ativa_consultaprevia)}
                    </li>
                    <li className="flex flex-row">
                        Webgeo {renderBoolIcon(!!record.cam_ativa_webgeo)}
                    </li>
                    <li className="flex flex-row">
                        Confrontante{" "}
                        {renderBoolIcon(!!record.cam_ativa_confrontante)}
                    </li>
                </ul>
            );
        },
    },
    {
        key: "cam_cache",
        headerClick: columnClick,
        name: "Cache",
        dataKey: "cam_cache",
        render: (value) => renderBoolIcon(value as boolean),
    },
    {
        key: "order",
        headerClick: columnClick,
        dataKey: "cam_ordem",
        name: "Ordem",
    },

    {
        key: "created_at",
        dataKey: "created_at",
        name: "Criado em",
        headerClick: columnClick,
        render: (value) => Masks.date(value as string),
    },
    {
        key: "updated_at",
        dataKey: "updated_at",
        name: "Atualizado em",
        headerClick: columnClick,
        render: (value) => Masks.date(value as string),
    },
];

export default tableColumns;
