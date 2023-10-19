import React from "react";

import { IconBaseProps } from "react-icons";

import { Link } from "react-router-dom";
import { GrpModulesPathEnum } from "../../../../shared/enums/grp-menus.enum";

interface ModulesButtonsProps {
    description: string;
    path: GrpModulesPathEnum;
    icon?: React.ComponentType<IconBaseProps>;
    isFixed: boolean;
    doAfterSelectModule(selectedModule: GrpModulesPathEnum): void;
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
                        ? "text-teal-600 bg-neutral-200"
                        : "text-teal-900"
                } transition duration-150 hover:text-teal-600  hover:bg-neutral-200 rounded w-full hover:-translate-y-1 p-2`}
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
