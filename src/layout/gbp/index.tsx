import React, { useState } from "react";

import { HeaderGbp } from "../../components/page-releated/gbp-layout/header";
import { NavBarGbp } from "../../components/page-releated/gbp-layout/nav-bar";

interface GpbLayoutProps {
    children?: React.ReactNode;
}

export const GpbLayout: React.FC<GpbLayoutProps> = ({ children }) => {
    const [isNavFocused, setIsNavFocused] = useState(false);
    return (
        <div className="flex flex-1">
            <NavBarGbp
                doAfterNavFocus={(isFocused) => setIsNavFocused(isFocused)}
            />
            <HeaderGbp />
            <div
                className={`duration-150 ${
                    isNavFocused ? "ml-44" : "ml-24"
                } peer-hover:ml-44 w-full mt-10 h-view mr-4`}
            >
                {children}
            </div>
        </div>
    );
};
