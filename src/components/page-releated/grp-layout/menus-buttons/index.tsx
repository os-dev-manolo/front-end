import React, { useState } from "react";

import { IconBaseProps } from "react-icons";

import { Link } from "react-router-dom";
import { IGrpSubMenusConfig } from "../../../../shared/interfaces/IGrpConfig";

interface MenusButtonsProps {
    description: string;
    icon?: React.ComponentType<IconBaseProps>;
    submenus: IGrpSubMenusConfig[];
}

export const MenusButtons: React.FC<MenusButtonsProps> = ({
    description,
    icon: Icon,
    submenus,
}) => {
    const [isClicked, setIsClicked] = useState(false);

    const toggleButtonClick = () => {
        setIsClicked(!isClicked);
    };

    return (
        <div className="relative">
            <button
                onClick={toggleButtonClick}
                type="button"
                className="flex p-5 flex-col justify-center items-center bg-neutral-100 text-teal-900 hover:text-teal-600 w-44 h-32 shadow-xl border rounded-lg"
            >
                <div className="mb-2">{Icon && <Icon size={28} />}</div>
                <div className="font-medium">{description}</div>
            </button>
            <button
                type="button"
                onClick={toggleButtonClick}
                style={{ minWidth: "176px", minHeight: "128px", width: "100%" }}
                className={`${!isClicked && "hidden"}
                                absolute z-2 top-0 space-y-2.5
                                rounded-lg shadow-xl bg-white`}
            >
                <ul className="m-0 p-0 p-2">
                    {submenus.map((submenu) => (
                        <li className="w-full" key={submenu.feature}>
                            <Link
                                to={submenu.navigate}
                                className="text-teal-600 flex items-center"
                            >
                                {submenu.icon && (
                                    <submenu.icon size={16} className="mr-2" />
                                )}
                                <p className="text-sm m-0 break-all">
                                    {submenu.description}
                                </p>
                            </Link>
                        </li>
                    ))}
                </ul>
            </button>
        </div>
    );
};
