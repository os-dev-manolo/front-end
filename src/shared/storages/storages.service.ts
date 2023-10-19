import { LocalStorage } from "./LocalStorage";
import { StoragesProvidersEnum } from "../enums/storages.enum";

export const StoragesService = {
    [StoragesProvidersEnum.LOCAL_STORAGE]: LocalStorage,
};
