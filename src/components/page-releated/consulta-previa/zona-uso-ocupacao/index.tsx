import React from "react";
import { IProperty } from "../../../../shared/interfaces/IProperties";

interface ZonUsoProps {
    propertyInfo?: IProperty;
}

export const ZonUso: React.FC<ZonUsoProps> = ({ propertyInfo }) => {
    const arrayOfQuestions = propertyInfo?.zoneamento?.questions;
    return (
        <div className="text-center  justify-center">
            <h3>ZONA DE USO E OCUPAÇÃO</h3>
            <h3>{propertyInfo?.zoneamento?.zona_uso.toUpperCase()}</h3>

            <p>{propertyInfo?.zoneamento?.observacao}</p>

            {arrayOfQuestions && (
                <table className="w-full table-auto border-2 border-black">
                    <thead className="border-t border-2 border-black">
                        <tr className="bg-gray-300 border">
                            <th>Nome</th>
                            <th>Quantidade</th>
                            <th>Observação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {arrayOfQuestions.map(
                            ({ texto, valor, observacao }) => {
                                return (
                                    <tr
                                        className="border-2 border-black"
                                        key={`${texto}-${valor}-${observacao}`}
                                    >
                                        <td>
                                            <p>{texto}</p>
                                        </td>
                                        <td>
                                            <p>{valor}</p>
                                        </td>
                                        <td>
                                            <p>{observacao}</p>
                                        </td>
                                    </tr>
                                );
                            }
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
};
