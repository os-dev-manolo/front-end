import {
    IoIosCheckmarkCircleOutline,
    IoIosCloseCircleOutline,
} from "react-icons/io";
import {
    EditAction,
    DeleteAction,
} from "../../../../../components/page-releated/grp-standard-screen/actions";
import { StandardGbpColumns } from "../../../../../layout/gbp-standard-screen";
import { ActionsButtonsEnum } from "../../../../../shared/enums/actions-buttons.enum";
import { Person } from "../../../../../shared/interfaces/IPerson";
import Masks from "../../../../../shared/utils/mask.utils";

const renderBoolIcon = (bool: boolean) => {
    return bool ? (
        <IoIosCheckmarkCircleOutline size={24} color="green" />
    ) : (
        <IoIosCloseCircleOutline size={24} color="red" />
    );
};
const tableColumns: StandardGbpColumns<Person> = ({
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
        key: "have-public-job",
        dataKey: "cargo_publico",
        name: "Cargo público",
        headerClick: columnClick,
        render(value, record) {
            return (
                <ul>
                    <li className="flex flex-row">
                        {renderBoolIcon(!!record.cargo_publico)}
                    </li>
                </ul>
            );
        },
    },
    {
        key: "is-related-politics",
        dataKey: "relacao_politica",
        name: "Relação com a política",
        headerClick: columnClick,
    },
    {
        key: "person-name",
        dataKey: "nome",
        name: "Nome completo",
        headerClick: columnClick,
    },
    {
        key: "personal-email",
        dataKey: "email_pessoal",
        name: "Email pessoal",
        headerClick: columnClick,
    },
    {
        key: "commercial-email",
        dataKey: "email_comercial",
        name: "Email comercial",
        headerClick: columnClick,
    },
    {
        key: "main-phone",
        dataKey: "telefone_principal",
        name: "Telefone 1",
        headerClick: columnClick,
    },
    {
        key: "secondary-phone",
        dataKey: "telefone_secundario",
        name: "Telefone 2",
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
