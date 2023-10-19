import { Link } from "react-router-dom";
import Masks from "../../../../shared/utils/mask.utils";

import { ITableColumns } from "../../../../shared/interfaces/ITable";
import Project from "../../../../shared/providers/projects/entities/project.entity";
import { LinearProgressBar } from "../../../../components/global";

const tableColumns: ITableColumns<Project>[] = [
    {
        key: "ratio",
        dataKey: "doneRatio",
        name: "Progresso",
        render(doneRatio) {
            return <LinearProgressBar progress={doneRatio as number} />;
        },
    },
    {
        key: "work",
        name: "Obra",
        dataKey: "work",
        render(_, record) {
            return <Link to={`${record.id}`}>{record.work}</Link>;
        },
    },
    {
        key: "priority",
        name: "Prioridade",
        dataKey: "priority",
    },
    {
        key: "type",
        name: "Tipo",
        dataKey: "type",
    },
    {
        key: "status",
        name: "Situação",
        dataKey: "status",
    },
    {
        key: "dueDate",
        name: "Previsão",
        dataKey: "dueDate",
        render: (value) => (value ? Masks.date(value as string) : "Em análise"),
    },
    {
        key: "estimatedHours",
        name: "Horas estimadas",
        dataKey: "estimatedHours",
        render: (value) => (value as number) || "Em análise",
    },
    {
        key: "inlineAddress",
        name: "Endereço",
        dataKey: "inlineAddress",
        render: (inlineAddress) => inlineAddress as string,
    },
    {
        key: "created_at",
        dataKey: "startDate",
        name: "Criado em",
        render: (value) => (value ? Masks.date(value as string) : ""),
    },
    {
        key: "createdby",
        name: "Criado por",
        dataKey: "createdby",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        render(value: any) {
            return value.name;
        },
    },
];

export default tableColumns;
