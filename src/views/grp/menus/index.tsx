import { useEffect, useState } from "react";
import { groupBy, keyBy } from "lodash";

import { useLocation } from "react-router-dom";
import { IGrpMenusConfig } from "../../../shared/interfaces/IGrpConfig";

import { MenusButtons } from "../../../components/page-releated/grp-layout/menus-buttons";
import { Header } from "../../../components/page-releated/grp-standard-screen/header";

import { MenusConfig } from "../../../config/grp/MenusConfig";
import { NavConfig } from "../../../config/grp/NavConfig";

const groupedMenus = groupBy(MenusConfig, "module");
const groupedModules = keyBy(NavConfig, "navigate");

export default () => {
    const { pathname } = useLocation();
    const module = pathname.split("/").pop();

    const [menus, setMenus] = useState<IGrpMenusConfig[]>();

    useEffect(() => {
        setMenus(groupedMenus[module || ""] || []);
    }, [module]);

    return (
        <>
            <Header
                title={groupedModules[module || ""]?.description}
                disableButtons
            />

            <div className="flex justify-center items-center mt-14">
                <div className="flex space-x-3.5">
                    {menus?.map((menu) => (
                        <MenusButtons
                            description={menu.description}
                            icon={menu.icon}
                            key={menu.key}
                            submenus={menu.submenus}
                        />
                    ))}
                </div>
            </div>
        </>
    );
};
