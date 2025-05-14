import { IPropertyConfrontantes } from "./property-confrontantes.interface";

export default interface IPropertyConfrontantesDataSource {
    updateConfrontantes(
        payload: UpdateConfrontantesArgs
    ): Promise<IPropertyConfrontantes>;
}

export interface UpdateConfrontantesArgs {
    inscricaoimobiliaria: string;
    cadastro?: string;
    areaconstruida?: string;
    areaterreno?: string;
    metragem?: string;
    lado_direito?: string;
    lado_esquerdo?: string;
    lado_fundos?: string;
    confrontacao_direita?: string;
    confrontacao_esquerda?: string;
    confrontacao_fundos?: string;
    testada?: string;
}
