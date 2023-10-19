import React from "react";

import { Tooltip as TooltipBoostratp, OverlayTrigger } from "react-bootstrap";

interface TooltipProps {
    children: React.ReactElement;
    text: string | React.ReactNode;
    placement?: "top" | "right" | "bottom" | "left";
}

export const Tooltip: React.FC<TooltipProps> = ({
    children,
    text,
    placement = "top",
}) => {
    return (
        <OverlayTrigger
            placement={placement}
            overlay={<TooltipBoostratp>{text}</TooltipBoostratp>}
        >
            {children}
        </OverlayTrigger>
    );
};
