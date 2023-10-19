/* eslint-disable default-case */
import {
    measureMask,
    moneyMask,
    percentMask,
} from "../../../../shared/utils/mask.utils";

const regexMatches = [
    /metro quadrado territoral/i,
    /metro quadrado predial/i,
    /metro quadrado terreno/i,
];

export const parser = (label: string, value?: string | number) => {
    if (regexMatches.some((regex) => regex.test(label.trim())))
        return moneyMask(value);

    switch (label.trim().toLowerCase()) {
        case "testada esquerda":
        case "testada frente":
        case "testada direita":
        case "testada fundos":
        case "área construída":
            return measureMask(value);

        case "percentual redutor":
            return percentMask(value);

        case "valor venal territorial":
        case "valor venal predial":
        case "valor tributo01":
        case "redutor":
        case "coleta de lixo":
        case "coleta lixo":
        case "iluminação":
        case "valor tributo 1":
        case "alíquota predial":
            if (
                (label === "Redutor" && value === "Sem") ||
                (label === "Coleta lixo" &&
                    !/^[\d.,]*$/.test(value?.toString() || ""))
            )
                return value;
            return moneyMask(value);
        default:
            return value;
    }
};
