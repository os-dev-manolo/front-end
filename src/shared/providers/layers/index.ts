import getLayersGroupsAsOptionsUsecase from "./usecases/getLayersGroupsAsOptions.usecase";
import getManagerLayersAsOptionsUsecase from "./usecases/getManagerLayersAsOptions.usecase";

const LayersComponent = {
    getManagerLayersAsOptions: getManagerLayersAsOptionsUsecase(),
    getLayersGroupsAsOptions: getLayersGroupsAsOptionsUsecase(),
};

Object.freeze(LayersComponent);

export default LayersComponent;
