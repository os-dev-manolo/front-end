/* eslint-disable react/button-has-type */
import React from "react";

interface SecundaryButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

export const SecundaryButton: React.FC<SecundaryButtonProps> = ({
    children,
    ...buttonProps
}) => {
    return (
        <button
            className="text-teal-900 hover:text-teal-600 w-full h-full py-1 rounded-md flex justify-center items-center"
            {...buttonProps}
        >
            {children}
        </button>
    );
};
