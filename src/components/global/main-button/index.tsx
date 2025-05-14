/* eslint-disable react/button-has-type */
import React from "react";
import ReactLoading from "react-loading";

interface MainButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    loading?: boolean;
    children: React.ReactNode;
}

export const MainButton: React.FC<MainButtonProps> = ({
    children,
    loading,
    ...buttonProps
}) => {
    return (
        <button
            className="font-bold text-white bg-blue-900 transition duration-300 ease-in-out hover:bg-blue-700  w-full h-full py-1 rounded-md flex justify-center items-center"
            disabled={loading}
            {...buttonProps}
        >
            <div className="mr-5">
                {loading && (
                    <ReactLoading
                        type="spinningBubbles"
                        height="30px"
                        width="30px"
                        color="white"
                    />
                )}
            </div>

            {children}
        </button>
    );
};
