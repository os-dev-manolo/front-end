import React from "react";

import { CgClose } from "react-icons/cg";

interface SideBarsProps {
    children: React.ReactNode;
    orientation?: "left" | "right";
    show: boolean;
    closeButton?: boolean;
    handleClose?(): void;
}

export const SideBars: React.FC<SideBarsProps> = ({
    orientation = "left",
    closeButton = true,
    show,
    handleClose,
    children,
}) => {
    return (
        <nav
            className={`${
                !show && "hidden"
            } w-auto absolute z-20  h-full bg-white/95 py-5 px-3 rounded-lg top-0 ${
                orientation === "right" ? "right-0" : null
            } content-center justify-center space-y-3.5 rounded-r-lg shadow-2xl`}
        >
            {closeButton && (
                <div
                    className={`grid ${
                        orientation === "right"
                            ? "justify-items-start"
                            : "justify-items-end"
                    }`}
                >
                    <button type="button" onClick={handleClose}>
                        <CgClose size={30} color="#666" />
                    </button>
                </div>
            )}
            {children}
        </nav>
    );
};
