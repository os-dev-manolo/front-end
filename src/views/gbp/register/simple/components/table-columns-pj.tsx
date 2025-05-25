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
import { LegalPerson } from "../../../../../shared/interfaces/ILegalPerson";

const renderBoolIcon = (bool: boolean) => {
    return bool ? (
        <IoIosCheckmarkCircleOutline size={24} color="green" />
    ) : (
        <IoIosCloseCircleOutline size={24} color="red" />
    );
};
const tableColumns: StandardGbpColumns<LegalPerson> = ({
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
        key: "razao-social",
        dataKey: "razao_social",
        name: "Razao Social",
        headerClick: columnClick,
    },
    {
        key: "fantasy-name",
        dataKey: "nome_fantasia",
        name: "Nome Fantasia",
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
        key: "atividade_principal",
        dataKey: "atividade_principal",
        name: "Atividade Principal",
        headerClick: columnClick,
    },
];

export default tableColumns;
