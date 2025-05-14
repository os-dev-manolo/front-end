import {
    IoIosCheckmarkCircleOutline,
    IoIosCloseCircleOutline,
} from "react-icons/io";

import Masks from "../../../../shared/utils/mask.utils";

import { IUser } from "../../../../shared/interfaces/IUser";
import { StandardGrpColumns } from "../../../../layout/grp-standard-screen";
import {
    DeleteAction,
    EditAction,
} from "../../../../components/page-releated/grp-standard-screen/actions";
import { ActionsButtonsEnum } from "../../../../shared/enums/actions-buttons.enum";

const tableColumns: StandardGrpColumns<IUser> = ({
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
        key: "usu_nome",
        name: "Nome",
        dataKey: "usu_nome",
        headerClick: columnClick,
    },
    {
        key: "usu_cpfcnpj",
        name: "Documento",
        dataKey: "usu_cpfcnpj",
        render(value) {
            return Masks.cpfCnpj(value as string);
        },
        headerClick: columnClick,
    },
    {
        key: "role_id",
        name: "Grupo",
        dataKey: "role_id",
        render(value, record) {
            return record.role?.role_descricao;
        },
        headerClick: columnClick,
    },
    {
        key: "usu_email",
        name: "Contatos",
        dataKey: "usu_email",
        render(value, record) {
            return (
                <ul className="p-0">
                    <li>Email: {record.usu_email}</li>
                    <li>Telefone: {record.usu_telefone}</li>
                </ul>
            );
        },
        headerClick: columnClick,
    },
    {
        key: "usu_ativo",
        name: "Ativo",
        dataKey: "usu_ativo",
        render(value) {
            return value ? (
                <IoIosCheckmarkCircleOutline size={24} color="green" />
            ) : (
                <IoIosCloseCircleOutline size={24} color="red" />
            );
        },
        headerClick: columnClick,
    },
    {
        key: "usu_codigo_resetsenha",
        name: "Código reset senha",
        dataKey: "usu_codigo_resetsenha",
        render: (value) => (value as string) || "---",
        headerClick: columnClick,
    },
    {
        key: "usu_codigo_ativacao",
        name: "Código de ativação",
        dataKey: "usu_codigo_ativacao",
        render: (value) => (value as string) || "---",
        headerClick: columnClick,
    },
    {
        key: "updated_at",
        dataKey: "updated_at",
        name: "Atualizado em",
        render: (value) => Masks.date(value as string),
        headerClick: columnClick,
    },
    {
        key: "created_at",
        dataKey: "created_at",
        name: "Criado em",
        render: (value) => Masks.date(value as string),
        headerClick: columnClick,
    },
];

export default tableColumns;
