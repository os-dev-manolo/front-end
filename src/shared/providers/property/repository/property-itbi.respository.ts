import IPropertyITBIDataSource from "../interfaces/property-itbi.datasource.interface";
import IPropertyITBIRepository from "../interfaces/property-itbi.repository.interface";
import PropertyITBIDatasource from "../datasource/property-itbi.datasource";
import PropertyITBI, {
    IPropertyITBIEntity,
} from "../entities/property-itbi.entity";

class PropertyITBIRepository implements IPropertyITBIRepository {
    private readonly datasource: IPropertyITBIDataSource;

    constructor(
        datasource: IPropertyITBIDataSource = new PropertyITBIDatasource()
    ) {
        this.datasource = datasource;
    }

    async getPropertyItbi(
        registration: string | number
    ): Promise<IPropertyITBIEntity[]> {
        const response = await this.datasource.getPropertyItbi(registration);

        return response.map((itbi) => PropertyITBI(itbi));
    }
}

export default PropertyITBIRepository;
