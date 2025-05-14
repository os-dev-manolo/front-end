import { AxiosInstance } from "axios";
import { semvApi } from "../../../services/axios/apis.service";
import IPropertyConfrontantesDataSource, {
    UpdateConfrontantesArgs,
} from "../interfaces/property-confrontantes.datasource.interface";
import { IPropertyConfrontantes } from "../interfaces/property-confrontantes.interface";

class PropertyConfrontantesDatasource
    implements IPropertyConfrontantesDataSource
{
    private readonly api: AxiosInstance;

    constructor(api: AxiosInstance = semvApi) {
        this.api = api;
    }

    async updateConfrontantes(
        payload: UpdateConfrontantesArgs
    ): Promise<IPropertyConfrontantes> {
        const { data: confrontante } = await this.api.patch(
            `/properties/confrontantes`,
            payload
        );

        return confrontante as IPropertyConfrontantes;
    }
}

export default PropertyConfrontantesDatasource;
