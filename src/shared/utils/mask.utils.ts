import { DateTime, DateTimeFormatOptions } from "luxon";
import { Regex } from "./regex";

import { DateTypesMaks, MaskTypes } from "../interfaces/IMask";

const DateMasks: Record<DateTypesMaks, DateTimeFormatOptions> = {
    date: DateTime.DATE_SHORT,
    dateTime: DateTime.DATETIME_SHORT,
    time: DateTime.TIME_24_SIMPLE,
};

const stringifyValue = (value?: string | number) =>
    typeof value === "number" ? value.toString() : value || "0";

export const onlyNumbersMask = (value: string | number) => {
    return value.toString().replace(Regex.ONLY_NUMBERS, "");
};

export const moneyMask = (value?: string | number) => {
    let newValue = stringifyValue(value);

    if (newValue.match(".,"))
        newValue = newValue.replaceAll(".", "").replaceAll(",", ".");

    return parseFloat(newValue).toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        style: "currency",
        currency: "BRL",
    });
};

export const measureMask = (value?: string | number) => {
    const newValue = stringifyValue(value);

    return `${parseFloat(newValue).toFixed(2)} m²`;
};

export const percentMask = (value?: string | number) => {
    const newValue = stringifyValue(value).replace(",", ".");

    return `${parseFloat(newValue).toFixed(2)} %`;
};

export const dateMask = (
    value: string | number,
    type: DateTypesMaks
): string => {
    // Verifica se o valor é válido antes de prosseguir
    if (value == null) return ""; // Retorna uma string vazia se o valor for null ou undefined

    const date = DateTime.fromISO(value.toString()); // Agora é seguro chamar toString()

    const format = DateMasks[type];

    return date.setLocale("pt-BR").toLocaleString(format);
};

export const phoneMask = (value: string | number): string => {
    return onlyNumbersMask(value)
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{5})(\d{4})/, "$1-$2");
};

export const cpfMask = (value: string | number): string => {
    return onlyNumbersMask(value)
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})/, "$1-$2")
        .replace(/(-\d{2})\d+?$/, "$1");
};

export const cnpjMask = (value: string | number) => {
    return onlyNumbersMask(value)
        .replace(/(\d{2})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1/$2")
        .replace(/(\d{4})(\d{2})/, "$1-$2");
};

export const cepMask = (value: string | number) => {
    return onlyNumbersMask(value).replace(/^(\d{5})(\d{3})+?$/, "$1-$2");
};

export const cpfOrCnpjMask = (value: string | number) => {
    const stringValue = onlyNumbersMask(value);

    if (stringValue.length <= 11) return cpfMask(stringValue);

    return cnpjMask(stringValue);
};

const Masks: Record<MaskTypes, (args: string | number) => string> = {
    time: (value: string | number) => dateMask(value, "time"),
    date: (value: string | number) => dateMask(value, "date"),
    dateTime: (value: string | number) => dateMask(value, "dateTime"),
    cepMask: (value: string | number) => cepMask(value),
    cpfCnpj: (value: string | number) => cpfOrCnpjMask(value),
    currency: (value: string | number) => moneyMask(value),
    measure: (value: string | number) => measureMask(value),
    percent: (value: string | number) => percentMask(value),
    phone: (value: string | number) => phoneMask(value),
};

export default Masks;
