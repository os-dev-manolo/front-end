import React from "react";

import { IconBaseProps } from "react-icons";
import { FeaturesEnum } from "../enums/features.enum";
import { GrpModulesPathEnum } from "../enums/grp-menus.enum";

export interface IGenericRoute {
    description: string;
    icon: React.ComponentType<IconBaseProps>;
    order?: number;
}

export type INavConfig = Array<
    IGenericRoute & {
        navigate: GrpModulesPathEnum;
    }
>;

export interface IGrpSubMenusConfig extends IGenericRoute {
    navigate: string;
    feature: FeaturesEnum;
}

export interface IGrpMenusConfig extends IGenericRoute {
    module: GrpModulesPathEnum;
    key: string;
    submenus: IGrpSubMenusConfig[];
}

export interface IGrpRoutesConfig {
    path: string;
    element?: React.FC;
    key: string;
}
