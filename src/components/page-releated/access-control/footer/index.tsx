import React from "react";

interface FooterProps {
    children: React.ReactNode;
}

export const Footer: React.FC<FooterProps> = ({ children }) => {
    return (
        <div className="fixed bottom-4 h-42 shadow-xl m-0 p-0">{children}</div>
    );
};
