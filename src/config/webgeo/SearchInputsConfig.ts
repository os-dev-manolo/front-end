import { IconType } from "react-icons";

import {
    MdOutlineSubtitles,
    MdPersonOutline,
    MdOutlineMyLocation,
    MdOutlineShareLocation,
    MdArticle,
    MdAppRegistration,
} from "react-icons/md";

export default {
    inscricaoimobiliaria: {
        label: "Inscrição",
        icon: MdOutlineSubtitles,
    },
    propnome: {
        label: "Proprietário",
        icon: MdPersonOutline,
    },
    bairronome: {
        label: "Bairro",
        icon: MdOutlineMyLocation,
    },
    logradouronome: {
        label: "Logradouro",
        icon: MdOutlineMyLocation,
    },
    quadra: {
        label: "Quadra",
        icon: MdOutlineShareLocation,
    },
    lote: {
        label: "Lote",
        icon: MdOutlineShareLocation,
    },
    matricula: {
        label: "Matrícula",
        icon: MdArticle,
    },
    cadastro: {
        label: "Cadastro",
        icon: MdAppRegistration,
    },
} as Record<string, { label: string; icon: IconType }>;
