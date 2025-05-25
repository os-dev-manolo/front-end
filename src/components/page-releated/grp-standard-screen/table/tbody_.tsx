/* eslint-disable react/no-array-index-key */
// TBody.tsx
import React from "react";
import { ITableColumns } from "../../../../shared/interfaces/ITable";

interface TBodyProps<T> {
    columns: ITableColumns<T>[];
    dataSource: T[];
}

export function TBody<T>({ columns, dataSource }: TBodyProps<T>) {
    return (
        <tbody className="divide-y divide-gray-200">
            {dataSource.map((row, rowIndex) => (
                <tr
                    key={rowIndex}
                    className={`${
                        rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-gray-100`}
                >
                    {columns.map((col) => (
                        <td
                            key={col.key as string}
                            className="px-6 py-4 text-sm text-gray-700 whitespace-normal break-words"
                        >
                            {col.render
                                ? col.render(row[col.dataKey], row)
                                : `${row[col.dataKey] ?? ""}`}
                        </td>
                    ))}
                </tr>
            ))}

            {dataSource.length === 0 && (
                <tr>
                    <td
                        colSpan={columns.length}
                        className="px-6 py-4 text-center text-sm text-gray-500"
                    >
                        Nenhum registro encontrado.
                    </td>
                </tr>
            )}
        </tbody>
    );
}
