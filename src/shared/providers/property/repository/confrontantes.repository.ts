import PropertyConfrontantesDatasource from "../datasource/property-confrontante.datasource";
import IPropertyConfrontantesDataSource, {
    UpdateConfrontantesArgs,
} from "../interfaces/property-confrontantes.datasource.interface";
import { IPropertyConfrontantes } from "../interfaces/property-confrontantes.interface";

class PropertyConfrontantesRepository
    implements IPropertyConfrontantesDataSource
{
    private readonly datasource: IPropertyConfrontantesDataSource;

    constructor(
        datasource: IPropertyConfrontantesDataSource = new PropertyConfrontantesDatasource()
    ) {
        this.datasource = datasource;
    }

    async updateConfrontantes({
        inscricaoimobiliaria,
        cadastro,
        areaconstruida,
        areaterreno,
        metragem,
        lado_direito,
        lado_esquerdo,
        lado_fundos,
        confrontacao_direita,
        confrontacao_esquerda,
        confrontacao_fundos,
        testada,
    }: UpdateConfrontantesArgs): Promise<IPropertyConfrontantes> {
        const payload = {
            inscricaoimobiliaria,
            cadastro,
            areaconstruida,
            areaterreno,
            metragem,
            lado_direito,
            lado_esquerdo,
            lado_fundos,
            confrontacao_direita,
            confrontacao_esquerda,
            confrontacao_fundos,
            testada,
        };

        const response = await this.datasource.updateConfrontantes(payload);

        return response as IPropertyConfrontantes;
    }
}

export default PropertyConfrontantesRepository;
