import { ITableColumns } from "../../../../shared/interfaces/ITable";

interface TBodyProps<T> {
    dataSource: T[];
    columns: ITableColumns<T>[];
}

export function TBody<T>({ columns, dataSource }: TBodyProps<T>) {
    return (
        <tbody>
            {dataSource.map((source, index) => (
                <tr
                    className={`${
                        index % 2 === 0 ? "bg-gray-100" : "bg-gray-0 "
                    } border-b transition duration-150 ease-in-out hover:-translate-y-1 hover:bg-gray-50`}
                >
                    {columns.map((column) => (
                        <td className="py-4 px-2 text-left text-slate-700">
                            {column.render
                                ? column.render(source[column.dataKey], source)
                                : (source[column.dataKey] as unknown as string)}
                        </td>
                    ))}
                </tr>
            ))}
        </tbody>
    );
}
