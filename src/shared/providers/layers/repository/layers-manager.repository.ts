import LayersManagerDatasource from "../datasource/layers-manager.datasource";
import Layer from "../entities/layer.entity";

export default class LayersManagerRepository {
    private readonly datasource;

    constructor(datasource = new LayersManagerDatasource()) {
        this.datasource = datasource;
    }

    async getAll() {
        const { data, paginate } = await this.datasource.getAll();

        return { layers: data.map((layer) => Layer(layer)), paginate };
    }
}
