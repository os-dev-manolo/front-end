// Table.tsx
import React from "react";
import { ITableColumns } from "../../../../shared/interfaces/ITable";
import { THead } from "./thead_";
import { TBody } from "./tbody_";

interface TableProps<T = any> {
    columns: ITableColumns<T>[];
    dataSource: T[];
    className?: string;
}

export function TableTest<T>({
    columns,
    dataSource,
    className,
}: TableProps<T>) {
    return (
        <div
            className={`w-full rounded-lg shadow-lg bg-white ${
                className || ""
            }`}
        >
            <table className="min-w-full divide-y divide-gray-200">
                <THead columns={columns} />
                <TBody columns={columns} dataSource={dataSource} />
            </table>
        </div>
    );
}
