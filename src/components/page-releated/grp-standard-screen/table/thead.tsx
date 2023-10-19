import { useState } from "react";
import { ITableColumns } from "../../../../shared/interfaces/ITable";

function HeadButton<T>({ name, dataKey, headerClick }: ITableColumns<T>) {
    const [, setOrder] = useState<"ASC" | "DESC">();

    const handleHeaderClick = () => {
        setOrder((previousState) => {
            const currentState = previousState === "ASC" ? "DESC" : "ASC";
            if (headerClick) headerClick(dataKey, currentState);

            return currentState;
        });
    };

    return (
        <button type="button" onClick={handleHeaderClick}>
            {name}
        </button>
    );
}

export function THead<T>({ columns }: { columns: ITableColumns<T>[] }) {
    return (
        <thead className="border-b">
            <tr>
                {columns.map((column) => (
                    <th
                        key={column.key}
                        scope="col"
                        className="text-slate-600 py-4 px-2 text-left"
                    >
                        <HeadButton {...column} />
                    </th>
                ))}
            </tr>
        </thead>
    );
}
