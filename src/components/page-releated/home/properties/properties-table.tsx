import React from "react";

import { IProperty } from "../../../../shared/interfaces/IProperties";

import { PropertyActions } from "./property-actions";

interface PropertiesTableProps {
    doAfterActionsClick?(): void;
    properties: Partial<IProperty>[];
}

const HIDDEN_TEXT = "*************";

export const PropertiesTable: React.FC<PropertiesTableProps> = ({
    doAfterActionsClick,
    properties,
}) => {
    return (
        <div className="flex flex-col h-full w-full">
            <div className="overflow-x-auto overflow-y-auto sm:-mx-6 lg:-mx-4">
                <div className="inline-block min-w-full">
                    <div className="overflow-hidden">
                        <table className="min-w-full table-auto border-teal-900">
                            <thead className="border-b">
                                <tr className="bg-gray-100">
                                    <th
                                        scope="col"
                                        className="text-lg font-bold text-gray-900 px-6 py-4 text-left"
                                    >
                                        #
                                    </th>
                                    <th
                                        scope="col"
                                        className="text-lg font-bold text-gray-900 px-6 py-4 text-left"
                                    >
                                        Proprietários
                                    </th>
                                    <th
                                        scope="col"
                                        className="text-lg font-bold text-gray-900 px-6 py-4 text-left"
                                    >
                                        Inscrição
                                    </th>
                                    <th
                                        scope="col"
                                        className="text-lg font-bold text-gray-900 px-6 py-4 text-left"
                                    >
                                        Logradouro
                                    </th>
                                    <th
                                        scope="col"
                                        className="text-lg font-bold text-gray-900 px-6 py-4 text-left"
                                    >
                                        Número
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {properties.map((property, index) => (
                                    <tr
                                        key={property.id}
                                        className={`${
                                            index % 2 !== 0
                                                ? "bg-gray-100 border-b"
                                                : "bg-white border-b"
                                        }`}
                                    >
                                        <td className="px-6 whitespace-nowrap text-sm font-medium text-gray-900 ">
                                            <div className="flex space-x-3.5">
                                                <PropertyActions
                                                    doAfterClick={
                                                        doAfterActionsClick
                                                    }
                                                    property={property}
                                                />
                                            </div>
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {property.propnome || HIDDEN_TEXT}
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {property.inscricaoimobiliaria ||
                                                HIDDEN_TEXT}
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {property.logradouronome ||
                                                HIDDEN_TEXT}
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {property.logradouronumero || ""}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};
