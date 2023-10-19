import React, { useEffect, useState } from "react";

import { ModulesButtons } from "../modules-buttons";
import { SemvIconLogo, ClientLogo } from "../../../../shared/assets/logos";

import { NavConfig } from "../../../../config/grp/NavConfig";
import { useToggle } from "../../../../shared/hooks/useToggle";
import { GrpModulesPathEnum } from "../../../../shared/enums/grp-menus.enum";

interface NavBarProps {
    doAfterNavFocus(isFocused: boolean): void;
}

export const NavBar: React.FC<NavBarProps> = ({ doAfterNavFocus }) => {
    const { isActive, toggle } = useToggle(false);
    const [selectedModule, setSelectedModule] = useState(
        GrpModulesPathEnum.HOME
    );

    useEffect(() => {
        doAfterNavFocus(isActive);
    }, [isActive, doAfterNavFocus]);

    return (
        <nav
            className={`peer group fixed ${
                isActive ? "w-40" : "w-20"
            } transition-[width] duration-150 h-screen bg-neutral-100 space-y-4 flex flex-col justify-between items-center shadow hover:w-40`}
        >
            <button className="w-12 h-14 mt-2" type="button" onClick={toggle}>
                <img src={SemvIconLogo} alt="semv" />
            </button>
            <div className="overflow-y-auto flex flex-col space-y-4 py-2">
                {NavConfig.map((module) => (
                    <ModulesButtons
                        isFixed={isActive}
                        description={module.description}
                        path={module.navigate}
                        icon={module.icon}
                        key={module.navigate}
                        doAfterSelectModule={(module_) =>
                            setSelectedModule(module_)
                        }
                        isSelected={selectedModule === module.navigate}
                    />
                ))}
            </div>
            <img className="w-14 mb-4" src={ClientLogo} alt="logo" />
        </nav>
    );
};
