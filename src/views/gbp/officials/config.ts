import { IGbpStandardPageConfig } from "../../../shared/interfaces/IPageConfig";
import { Official } from "../../../shared/interfaces/IPoliticalChains";

export const Config: IGbpStandardPageConfig<Official> = {
    api: { path: "crud/cargos-politicos" },
    fields: {
        id: { label: "Código", fieldType: "number" },
        nome: { label: "Nome do cargo", fieldType: "text" },
        poder: { label: "Descrição do cargo", fieldType: "text" },
        nivel: { label: "Criado em", fieldType: "text" },
        tipo: { label: "Atualizado em", fieldType: "text" },
    },
};
