import { ProjectHistoryDetailEnum } from "../../../../shared/providers/projects/enums/project-history.enum";

export const historyNameLabel: Record<ProjectHistoryDetailEnum, string> = {
    attachment: "anexo",
    due_date: "data prevista",
    estimated_hours: "horas estimadas",
    done_ratio: "progresso",
    cnpj: "CNPJ do tomador",
    description: "descrição",
    number: "N. Predial",
    ressource: "Fonte de recurso",
    secretay: "secretaria",
    street: "rua",
    value: "Valor estimado do investimento",
    work: "obra",
    zipcode: "CEP",
};

export const historyActionLabel: Record<string, string> = {
    delete: "Removido",
    insert: "Inserido",
    update: "Atualizado",
};
