// THead.tsx
import React from "react";
import { ITableColumns } from "../../../../shared/interfaces/ITable";

interface THeadProps<T> {
    columns: ITableColumns<T>[];
}

export function THead<T>({ columns }: THeadProps<T>) {
    function getWidthClass(width: string) {
        switch (width) {
            case "50":
                return "w-12";
            case "100":
                return "w-24";
            case "200":
                return "w-48";
            case "300":
                return "w-72";
            default:
                return "max-w-xs";
        }
    }

    return (
        <thead className="bg-gray-800">
            <tr>
                {columns.map((col) => (
                    <th
                        key={col.key as string}
                        className={`px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-100 ${getWidthClass(
                            col.width
                        )} whitespace-normal break-words`}
                        title={col.name}
                    >
                        {col.name}
                    </th>
                ))}
            </tr>
        </thead>
    );
}
