import React from "react";

interface RoundedButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    active?: boolean;
    description: string;
    tooltipPosition?: "top" | "left";
}

const ToolTip = ({
    tooltipPosition,
    description,
}: Pick<RoundedButtonProps, "tooltipPosition" | "description">) => (
    <div
        className={`hidden group-hover:block absolute ${
            tooltipPosition === "left" ? "right-14 mr-2" : "bottom-14 mb-2"
        } bg-stone-800/90 text-stone-50 rounded-lg text-sm p-2`}
    >
        {description}
    </div>
);

export const RoundedButton: React.FC<RoundedButtonProps> = ({
    children,
    description,
    active,
    tooltipPosition = "top",
    ...buttonProps
}) => {
    return (
        <button
            {...buttonProps}
            className={`group rounded-full ${
                !active ? "bg-teal-50" : "bg-teal-900 -translate-y-3"
            } h-10 w-10 text-black relative transition hover:-translate-y-3 hover:bg-teal-900 duration-700 shadow-2xl flex items-center justify-center md:h-14 md:w-14`}
            type="button"
        >
            {children}
            <ToolTip
                description={description}
                tooltipPosition={tooltipPosition}
            />
        </button>
    );
};
