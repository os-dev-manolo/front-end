import React from "react";

import { IconBaseProps } from "react-icons";

import { Link } from "react-router-dom";
import { GbpModulesPathEnum } from "../../../../shared/enums/gbp-menus.enum";

interface ModulesButtonsProps {
    description: string;
    path: GbpModulesPathEnum;
    icon?: React.ComponentType<IconBaseProps>;
    isFixed: boolean;
    doAfterSelectModule(selectedModule: GbpModulesPathEnum): void;
    isSelected: boolean;
}

export const ModulesButtons: React.FC<ModulesButtonsProps> = ({
    description,
    path,
    icon: Icon,
    isFixed,
    doAfterSelectModule,
    isSelected,
}) => {
    return (
        <Link
            to={path}
            className="no-underline w-full"
            onClick={() => doAfterSelectModule(path)}
        >
            <div
                className={`flex items-center ${
                    isSelected
                        ? "text-blue-600 bg-neutral-200"
                        : "text-blue-900"
                } transition duration-150 hover:text-blue-600  hover:bg-neutral-200 rounded w-full hover:-translate-y-1 p-2`}
            >
                <div>{Icon && <Icon size={24} />}</div>
                <div
                    className={`${
                        isFixed ? "block" : "hidden"
                    } group-hover:block ml-2 text-sm `}
                >
                    {description}
                </div>
            </div>
        </Link>
    );
};
