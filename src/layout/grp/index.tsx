import React, { useState } from "react";

import { NavBar } from "../../components/page-releated/grp-layout/nav-bar";
import { Header } from "../../components/page-releated/grp-layout/header";

interface GrpLayoutProps {
    children?: React.ReactNode;
}

export const GrpLayout: React.FC<GrpLayoutProps> = ({ children }) => {
    const [isNavFocused, setIsNavFocused] = useState(false);
    return (
        <div className="flex flex-1">
            <NavBar
                doAfterNavFocus={(isFocused) => setIsNavFocused(isFocused)}
            />
            <Header />
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
