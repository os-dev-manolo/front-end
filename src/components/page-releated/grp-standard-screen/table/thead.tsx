import { useState } from "react";
import { ITableColumns } from "../../../../shared/interfaces/ITable";

function HeadButton<T>({ name, dataKey, headerClick }: ITableColumns<T>) {
    const [order, setOrder] = useState<"ASC" | "DESC" | undefined>();

    const handleHeaderClick = () => {
        setOrder((prev) => {
            const nextOrder = prev === "ASC" ? "DESC" : "ASC";
            headerClick?.(dataKey, nextOrder);
            return nextOrder;
        });
    };

    return (
        <button
            type="button"
            onClick={handleHeaderClick}
            className="flex items-center gap-1"
        >
            {name}
            {order === "ASC" && <span>↑</span>}
            {order === "DESC" && <span>↓</span>}
        </button>
    );
}

export function THead<T>({ columns }: { columns: ITableColumns<T>[] }) {
    return (
        <thead className="border-b">
            <tr>
                {columns.map((column) => (
                    <th
                        key={String(column.key)}
                        scope="col"
                        className="text-purple-600 py-4 px-2 text-left text-xs sm:text-sm font-medium"
                    >
                        <HeadButton {...column} />
                    </th>
                ))}
            </tr>
        </thead>
    );
}
