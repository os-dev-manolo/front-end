import IPropertyConfrontantesDataSource from "../interfaces/property-confrontantes.datasource.interface";

export default (repository: IPropertyConfrontantesDataSource) =>
    async ({
        subscription,
        register,
        areaconstruida,
        areaterreno,
        metragem,
        direita,
        esquerda,
        fundos,
        confrontacaodireita,
        confrontacaoesquerda,
        confrontacaofundos,
        testada,
    }: {
        subscription: string;
        register: string;
        areaconstruida?: string;
        areaterreno?: string;
        metragem?: string;
        direita?: string;
        esquerda?: string;
        fundos?: string;
        confrontacaodireita?: string;
        confrontacaoesquerda?: string;
        confrontacaofundos?: string;
        testada?: string;
    }) => {
        const payload = {
            inscricaoimobiliaria: subscription,
            cadastro: register,
            areaconstruida: areaconstruida || undefined,
            areaterreno: areaterreno || undefined,
            metragem: metragem || undefined,
            lado_direito: direita || undefined,
            lado_esquerdo: esquerda || undefined,
            lado_fundos: fundos || undefined,
            confrontacao_direita: confrontacaodireita || undefined,
            confrontacao_esquerda: confrontacaoesquerda || undefined,
            confrontacao_fundos: confrontacaofundos || undefined,
            testada: testada || undefined,
        };
        const property = await repository.updateConfrontantes(payload);

        return property;
    };
