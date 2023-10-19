import PropertyConfrontantesRepository from "./repository/confrontantes.repository";
import PropertyITBIRepository from "./repository/property-itbi.respository";
import PropertyRepository from "./repository/property.repository";
import getPropertyHistoryUsecase from "./usecases/getPropertyHistory.usecase";
import getPropertyITBIUsecase from "./usecases/getPropertyITBI.usecase";
import updateConfrontanteTsUsecase from "./usecases/updateConfrontante.ts.usecase";
import updatePropertyRelatedToGeomUsecase from "./usecases/updatePropertyRelatedToGeom.usecase";
import updatePropertyRelatedToSubscriptionUsecase from "./usecases/updatePropertyRelatedToSubscription.usecase";
import uploadFileUsecase from "./usecases/uploadFile.usecase";

const propertyRepository = new PropertyRepository();
const propertyITBIRepository = new PropertyITBIRepository();
const propertyConfrontantesRepository = new PropertyConfrontantesRepository();

const PropertyProvider = {
    updatePropertyByGeom:
        updatePropertyRelatedToGeomUsecase(propertyRepository),
    updatePropertyBySybscription:
        updatePropertyRelatedToSubscriptionUsecase(propertyRepository),
    uploadPropertyFiles: uploadFileUsecase(propertyRepository),
    getPropertyChangesHistory: getPropertyHistoryUsecase(propertyRepository),
    getPropertyITBI: getPropertyITBIUsecase(propertyITBIRepository),

    updateConfrontantes: updateConfrontanteTsUsecase(
        propertyConfrontantesRepository
    ),
};

export default PropertyProvider;
