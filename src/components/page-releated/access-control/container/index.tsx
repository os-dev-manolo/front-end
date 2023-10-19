import React from "react";

interface ContainerProps {
    children?: React.ReactNode;
}

export const Container: React.FC<ContainerProps> = ({ children }) => {
    return <div className="flex mt-10 w-100 mb-10">{children}</div>;
};
