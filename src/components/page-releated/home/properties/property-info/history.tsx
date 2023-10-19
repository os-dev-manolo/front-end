import React, { useEffect, useState } from "react";

import { useProperties } from "../../../../../shared/contexts/properties.context";
import { IPropertyHistoryEntity } from "../../../../../shared/providers/property/entities/porperty-history.entity";
import Masks from "../../../../../shared/utils/mask.utils";

import { FileList } from "../../../../global/file-list";

interface HistoryProps {
    geomId: number;
    propertyId?: number;
}

export const History: React.FC<HistoryProps> = ({ geomId, propertyId }) => {
    const { getPropertyChangesHistory } = useProperties();
    const [history, setHistory] = useState<IPropertyHistoryEntity[]>();

    useEffect(() => {
        const fetchHistory = async () => {
            const propertyHistory = await getPropertyChangesHistory(
                geomId,
                propertyId
            ).catch(() => []);

            setHistory(propertyHistory);
        };

        fetchHistory();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [geomId, propertyId]);

    if (!history) return null;

    return (
        <>
            <h4>Histórico de atualizações</h4>

            <div className="flex flex-col h-full w-full">
                <div className="overflow-x-auto overflow-y-auto sm:-mx-6 lg:-mx-4">
                    <div className="inline-block min-w-full">
                        <div className="overflow-hidden">
                            <table className="min-w-full table-auto border-teal-900">
                                <thead className="border-b">
                                    <tr className="bg-gray-100">
                                        <th
                                            scope="col"
                                            className="text-md font-semibold px-6 py-4 text-left"
                                        >
                                            Feito por
                                        </th>
                                        <th
                                            scope="col"
                                            className="text-md font-semibold px-6 py-4 text-left"
                                        >
                                            Inscrição
                                        </th>
                                        <th
                                            scope="col"
                                            className="text-md font-semibold px-6 py-4 text-left"
                                        >
                                            Observação
                                        </th>
                                        <th
                                            scope="col"
                                            className="text-md font-semibold px-6 py-4 text-left"
                                        >
                                            Arquivos
                                        </th>
                                        <th
                                            scope="col"
                                            className="text-md font-semibold px-6 py-4 text-left"
                                        >
                                            Relacionado
                                        </th>
                                        <th
                                            scope="col"
                                            className="text-lg font-semibold px-6 py-4 text-left"
                                        >
                                            Data
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {history.map((hist, index) => (
                                        <tr
                                            key={hist.id}
                                            className={`${
                                                index % 2 !== 0
                                                    ? "bg-gray-100 border-b"
                                                    : "bg-white border-b"
                                            }`}
                                        >
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                {hist.modifiedBy}
                                            </td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                {hist.subscription}
                                            </td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                {hist.observation || "----"}
                                            </td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                <FileList
                                                    files={hist.files || []}
                                                    viewType="list"
                                                    canRemove={false}
                                                />
                                            </td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                {hist.realetedBy === "geom"
                                                    ? "Feição"
                                                    : "Inscrição"}
                                            </td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                {hist.updatedAt
                                                    ? Masks.dateTime(
                                                          hist.updatedAt as unknown as string
                                                      )
                                                    : "----"}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
