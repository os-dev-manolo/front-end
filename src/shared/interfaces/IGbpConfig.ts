import React from "react";

import { IconBaseProps } from "react-icons";
import { FeaturesEnum } from "../enums/features.enum";
import { GbpModulesPathEnum } from "../enums/gbp-menus.enum";


export interface IGenericRoute {
    description: string;
    icon: React.ComponentType<IconBaseProps>;
    order?: number;
}

export type INavConfig = Array<
    IGenericRoute & {
        navigate: GbpModulesPathEnum;
    }
>;

export interface IGbpSubMenusConfig extends IGenericRoute {
    navigate: string;
    feature: FeaturesEnum;
}

export interface IGbpMenusConfig extends IGenericRoute {
    module: GbpModulesPathEnum;
    key: string;
    submenus: IGbpSubMenusConfig[];
}

export interface IGbpRoutesConfig {
    path: string;
    element?: React.FC;
    key: string;
}
