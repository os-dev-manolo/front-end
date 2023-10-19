import { useEffect, useState } from "react";
import { groupBy, keyBy } from "lodash";

import { useLocation } from "react-router-dom";

import { Header } from "../../../components/page-releated/grp-standard-screen/header";
import { MenusConfigGbp } from "../../../config/gbp/MenusConfig";
import { NavConfigGbp } from "../../../config/gbp/NavConfig";
import { IGbpMenusConfig } from "../../../shared/interfaces/IGbpConfig";
import { MenusButtonsGbp } from "../../../components/page-releated/gbp-layout/menus-buttons";

const groupedMenus = groupBy(MenusConfigGbp, "module");
const groupedModules = keyBy(NavConfigGbp, "navigate");

export default () => {
    const { pathname } = useLocation();
    const module = pathname.split("/").pop();

    const [menus, setMenus] = useState<IGbpMenusConfig[]>();

    useEffect(() => {
        setMenus(groupedMenus[module || ""] || []);
    }, [module]);

    return (
        <>
            <Header
                title={groupedModules[module || ""]?.description}
                disableButtons
            />
            <br />
            <div className="grid grid-cols-3 gap-2 justify-items-center content-center md:grid-cols-3">
                {menus?.map((menu) => (
                    <MenusButtonsGbp
                        description={menu.description}
                        icon={menu.icon}
                        key={menu.key}
                        submenus={menu.submenus}
                    />
                ))}
            </div>
        </>
    );
};
