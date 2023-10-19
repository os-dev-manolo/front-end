import { ITableColumns } from "../../../shared/interfaces/ITable";
import Masks from "../../../shared/utils/mask.utils";

import { IUser } from "../../../shared/interfaces/IUser";

const tableColumns: ITableColumns<IUser>[] = [
    {
        key: "id",
        name: "Código",
        dataKey: "id",
    },
    {
        key: "usu_nome",
        name: "Nome",
        dataKey: "usu_nome",
    },
    {
        key: "role_id",
        name: "Grupo",
        dataKey: "role_id",
        render(value, record) {
            return record.role?.role_descricao;
        },
    },
    {
        key: "created_at",
        dataKey: "created_at",
        name: "Criado em",
        render: (value) => Masks.date(value as string),
    },
];

export default tableColumns;
