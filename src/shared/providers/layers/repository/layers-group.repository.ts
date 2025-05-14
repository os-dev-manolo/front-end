import LayersGroupsDatasource from "../datasource/layers-groups.datasource";
import LayerGroup from "../entities/layer-group.entity";

export default class LayersGroupsRepository {
    private readonly datasource;

    constructor(datasource = new LayersGroupsDatasource()) {
        this.datasource = datasource;
    }

    async getAll() {
        const { data, paginate } = await this.datasource.getAll();

        return { groups: data.map((layer) => LayerGroup(layer)), paginate };
    }
}
