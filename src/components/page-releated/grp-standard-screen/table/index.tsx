import { ITableColumns } from "../../../../shared/interfaces/ITable";

import { THead } from "./thead";
import { TBody } from "./tbody";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface TableProps<T = any> {
    columns: ITableColumns<T>[];
    dataSource: T[];
}

export function Table<T>({ columns, dataSource }: TableProps<T>) {
    return (
        <div className="flex flex-col w-full my-2 border rounded-lg shadow-md">
            <div className="overflow-x-auto overflow-y-auto sm:mx-1 ">
                <div className="inline-block min-w-full">
                    <div className="overflow-hidden">
                        <table className="my-2 w-full table-auto ">
                            <THead columns={columns} />
                            <TBody columns={columns} dataSource={dataSource} />
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
