import React, { useRef } from "react";
import { IconBaseProps } from "react-icons";
import { Tooltip, OverlayTrigger } from "react-bootstrap";

interface ActionsButtonProps {
    onClick?(): void;
    tooltip: {
        position?: "left" | "top" | "right" | "bottom";
        text: string;
    };
    icon: React.ComponentType<IconBaseProps>;
    color?: string;
}

export const ActionButtonGbp: React.FC<ActionsButtonProps> = ({
    icon: Icon,
    onClick,
    color = "blue",
    tooltip,
}) => {
    const buttonRef = useRef<HTMLButtonElement>(null);

    return (
        <OverlayTrigger
            placement={tooltip?.position || "top"}
            delay={{ show: 250, hide: 400 }}
            overlay={<Tooltip id="button-tooltip">{tooltip?.text}</Tooltip>}
        >
            <button ref={buttonRef} type="button" onClick={onClick}>
                <Icon size={15} color={color} />
            </button>
        </OverlayTrigger>
    );
};
