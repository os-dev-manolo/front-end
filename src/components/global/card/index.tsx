import React from "react";

export function Card({
    children,
    title,
    titleRight,
}: {
    title?: string;
    children: React.ReactNode;
    titleRight?: React.ReactNode;
}) {
    return (
        <div className="block p-6 bg-white border border-gray-200 rounded-lg shadow">
            <div className="flex justify-between">
                {title && (
                    <h4 className="mb-2 font-bold text-teal-900">{title}</h4>
                )}

                {titleRight}
            </div>
            <hr />
            {children}
        </div>
    );
}
