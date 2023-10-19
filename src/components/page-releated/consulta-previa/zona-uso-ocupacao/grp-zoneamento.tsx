import React from "react";
import { IProperty } from "../../../../shared/interfaces/IProperties";

interface ZonUsoProps {
    propertyInfo?: IProperty;
}

export const ZonUsoGrpZoneamento: React.FC<ZonUsoProps> = ({
    propertyInfo,
}) => {
    const arrayOfQuestions = propertyInfo?.grp_zoneamento?.questions;
    return (
        <div className="text-center  justify-center">
            <h3>ZONA DE USO E OCUPAÇÃO</h3>
            <h3>{propertyInfo?.grp_zoneamento?.descricao.toUpperCase()}</h3>

            <p>{propertyInfo?.grp_zoneamento?.obs}</p>

            {arrayOfQuestions && (
                <table className="w-full table-auto border-2 border-black">
                    <thead className="border-t border-2 border-black">
                        <tr className="bg-gray-300 border">
                            <th style={{ width: "40%" }}>Nome</th>
                            <th style={{ width: "20%" }}>Quantidade</th>
                            <th style={{ width: "40%" }}>Observação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {arrayOfQuestions.map(
                            ({ texto, valor, observacao }) => {
                                // {texto && valor && observacao &&}
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
            <br />
        </div>
    );
};
