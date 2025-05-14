export interface IPropertyConfrontantes {
    id: number;
    inscricaoimobiliaria: string;
    cadastro: string;
    lado_direito: string;
    lado_esquerdo: string;
    lado_fundos: string;
    areaterreno: string;
    areaconstruida: string;
    metragem: string;
    confrontacao_direita: string;
    confrontacao_esquerda: string;
    confrontacao_fundos: string;
    testada: string;
}

export interface IConfrontanteProperty {
    id: number;
    inscricaoimobiliaria: string;
    cadastro: string;
    propnome: string;
    logradouronome: string;
    logradouronumero: string;
    bairronome: string;
    valorvenaltotal: string;
    quadra: string;
    lote: string;
    areaterreno: string;
    areaconstruida: string;
    utilizacao: string;
    metragem: string;
    testada: string;
    matricula: string;
}

export interface IConfrontantePropertyPOST {
    inscricaoimobiliaria: string;
    cadastro: string;
    propnome: string;
    logradouronome: string;
    logradouronumero: string;
    bairronome: string;
    valorvenaltotal: string;
    quadra: string;
    lote: string;
    areaterreno: string;
    areaconstruida: string;
    utilizacao: string;
    metragem: string;
    testada: string;
    matricula: string;
}

export interface IConfrontanteSidePOST {
    inscricaoimobiliaria: string;
    cadastro: string;
    propnome: string;
    logradouronome: string;
    logradouronumero: string;
    bairronome: string;
    quadra: string;
    lote: string;
    areaterreno: string;
    areaconstruida: string;
    medida: string;
    lado: string;
    tipo: string;
    inscricao_confrontacao: string;
    cadastro_confrontacao: string;
    matricula_confrontacao: string;
}

export interface IConfrontanteSide {
    id: string;
    inscricaoimobiliaria: string;
    cadastro: string;
    propnome: string;
    logradouronome: string;
    logradouronumero: string;
    bairronome: string;
    quadra: string;
    lote: string;
    areaterreno: string;
    areaconstruida: string;
    medida: string;
    lado: string;
    tipo: string;
    inscricao_confrontacao: string;
    cadastro_confrontacao: string;
    matricula_confrontacao: string;
}
