import { useState } from "react";

export const colorMap: Record<string, string> = {
    b: "#155a8a",
    r: "#c43131",
    g: "#179a75",
    o: "#b77407",
    p: "#4a2ea3",
    0: "#4d4d4d",
};

export const iconMap: Record<string, string> = {
    "@": "💼",
    "#": "📽️",
    "!": "⚠️",
    "%": "🎯",
    "*": "🎂",
    "0": "",
};

export const iconDescriptions: Record<string, string> = {
    "💼": "Reunião",
    "📽️": "Videoconferência",
    "⚠️": "Importante",
    "🎯": "Meta",
    "🎂": "Aniversário",
    "🔗": "Recorrente",
    "👥": "Com Participantes",
    "": "Evento Comum",
};

export function useFilters() {
    const [filters, setFilters] = useState<Record<string, boolean>>({
        "🎂": false,
        "🎯": true,
        "⚠️": true,
        "📽️": true,
        "💼": true,
        "": true,
        "👥": true,
        "🔗": true,
    });

    return { filters, setFilters };
}

export const colorLetterMap: Record<string, string> = {
    blue: "b",
    red: "r",
    green: "g",
    orange: "o",
    purple: "p",
};

export const colorMapReverse: Record<string, string> = {
    b: "blue",
    r: "red",
    g: "green",
    o: "orange",
    p: "purple",
};

export const iconOptions = [
    { value: "0", label: "Nenhum" },
    { value: "@", label: "💼 Reunião" },
    { value: "*", label: "🎂 Aniversário" },
    { value: "%", label: "🎯 Meta" },
    { value: "!", label: "⚠️ Importante" },
];

export const colorOptions = [
    { value: "blue", label: "🔵 Azul" },
    { value: "red", label: "🔴 Vermelho" },
    { value: "green", label: "🟢 Verde" },
    { value: "orange", label: "🟠 Laranja" },
    { value: "purple", label: "🟣 Roxo" },
];
