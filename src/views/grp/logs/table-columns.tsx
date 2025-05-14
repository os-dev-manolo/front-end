import Masks from "../../../shared/utils/mask.utils";

import { ILogsResponse } from "../../../shared/interfaces/ILogs";
import { StandardGrpColumns } from "../../../layout/grp-standard-screen";

const tableColumns: StandardGrpColumns<ILogsResponse> = () => [
    {
        key: "id",
        name: "Código",
        dataKey: "id",
    },
    {
        key: "log_message",
        name: "Mensagem",
        dataKey: "log_message",
    },
    {
        key: "usr_id",
        name: "Usuário",
        dataKey: "usr_id",
        render: (value, record) => record.user?.usu_nome,
    },
    {
        key: "usr_ip",
        name: "IP",
        dataKey: "usr_ip",
    },
    {
        key: "system",
        name: "Sistema",
        dataKey: "system",
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
