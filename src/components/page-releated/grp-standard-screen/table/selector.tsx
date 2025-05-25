/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState, useEffect } from "react";
import { ITableColumns } from "../../../../shared/interfaces/ITable";

interface ColumnSelectorProps<T> {
    allColumns: ITableColumns<T>[];
    visibleColumns: ITableColumns<T>[];
    onChange: (selected: ITableColumns<T>[]) => void;
}

export function ColumnSelector<T>({
    allColumns,
    visibleColumns,
    onChange,
}: ColumnSelectorProps<T>) {
    const [selectedKeys, setSelectedKeys] = useState<(keyof T)[]>(
        visibleColumns.map((col) => col.k).filter((k): k is keyof T => !!k)
    );

    useEffect(() => {
        const newVisible = allColumns.filter(
            (col) => col.k && selectedKeys.includes(col.k)
        );
        onChange(newVisible);
    }, [selectedKeys]);

    const toggleColumn = (key: keyof T) => {
        setSelectedKeys((prev) =>
            prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
        );
    };

    return (
        <div className="mb-4 flex flex-wrap gap-4">
            {allColumns
                .filter((col) => col.k !== undefined)
                .map((col) => (
                    <label
                        key={String(col.k)}
                        className="flex items-center space-x-2"
                    >
                        <input
                            type="checkbox"
                            checked={selectedKeys.includes(col.k!)}
                            onChange={() => toggleColumn(col.k!)}
                        />
                        <span className="text-sm text-gray-700">
                            {col.name}
                        </span>
                    </label>
                ))}
        </div>
    );
}
