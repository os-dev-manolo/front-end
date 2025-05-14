import React from "react";
import { useAuth } from "../../../../shared/hooks/useAuth";

import { LayersMenu } from "../layers/LayersMenu";

import { AreaMeasureMenu } from "../measures/area-measure";
import { LinearMeasureMenu } from "../measures/linear-measure";
import { EreaseMenu } from "../measures/erease";

import { PrintMap } from "../printMap";

import { SearchMenu } from "../search/SearchMenu";

import { GoogleMapsMenus } from "../google/maps";
import { StreetViewMenu } from "../google/streetview";

import { Signout, Password, Signin, Signup, Grp } from "../user";

export const Menus: React.FC = () => {
    const { signed } = useAuth();

    return (
        <div>
            <nav className="fixed z-10 w-14 right-6 top-20 rounded-lg flex flex-col items-center space-y-3.5 md:p-6 md:w-16 md:top-28 md:right-10">
                {signed ? (
                    <>
                        <Password />
                        <Grp />
                        <Signout />
                    </>
                ) : (
                    <>
                        <Signin />
                        <Signup />
                    </>
                )}
            </nav>

            <footer className="fixed z-10 md:h-16 md:p-8 left-4 md:left-1/3 rounded-lg bottom-5 flex flex-col md:flex-row items-center justify-center space-y-2.5 md:space-y-0 md:space-x-2.5">
                <EreaseMenu />
                <AreaMeasureMenu />
                <LinearMeasureMenu />

                {signed && (
                    <>
                        <LayersMenu />
                        <SearchMenu />
                        <GoogleMapsMenus />
                        <StreetViewMenu />
                        <PrintMap />
                    </>
                )}
            </footer>
        </div>
    );
};
