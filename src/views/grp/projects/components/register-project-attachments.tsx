import React from "react";
import { FileInput } from "../../../../components/global";

// Edificações
const profile1 = {
    attachment1: "Plano de necessidades",
    attachment2: "Matrícula ou documento equivalente",
    attachment3: "Fotos da edificação",
    attachment4: "Arquivos de edificações existentes",
};

// Espaços urbanos
const profile2 = {
    attachment1: "Plano de necessidades",
    attachment2: "Matrícula ou documento equivalente",
};

// Viário e interseções
const profile3 = {
    attachment1: "Plano de necessidades",
    attachment2: "Fotos da área",
};

// Loteamento e condomínion
const profile4 = {
    attachment1: "Plano de necessidades",
    attachment2: "Matrícula ou documento equivalente",
    attachment3: "Demanda a ser atendida",
    attachment4: "Lei de parcelamento urbano do município",
    attachment5: "Fotos da área",
};

// Redes públicas e infraestrutura
const profile5 = {
    attachment1: "Plano de necessidades",
    attachment2: "Fotos da área",
    attachment3: "Mapeamento da rede adjacente",
};

// Restauro ou intervenções em edificações tombadas
const profile6 = {
    attachment1: "Plano de necessidades",
    attachment2: "Matrícula ou documento equivalente",
    attachment3: "Fotos da edificação",
    attachment4: "Documento de tombo",
    attachment5: "Arquivos de edificação existente",
};

// retorna os campos baseado no tipo de projeto que o usuário solicitou
export const pickProfileBasedOnTracker = (
    tracker: number
): Record<string, string> => {
    // ids dos trackers dentro do redmine
    switch (tracker) {
        case 35:
            return profile1;
        case 36:
            return profile2;
        case 37:
            return profile3;
        case 38:
            return profile4;
        case 39:
            return profile5;
        default:
            return profile6;
    }
};

export default ({ trackerId }: { trackerId: number }) => {
    return (
        <>
            {Object.entries(pickProfileBasedOnTracker(trackerId)).map(
                ([name, label]) => (
                    <div className="col-span-5">
                        <p className="text-sm text-teal-800 p-0 m-0">
                            {label}:
                        </p>
                        <FileInput name={name} />
                    </div>
                )
            )}
        </>
    );
};
