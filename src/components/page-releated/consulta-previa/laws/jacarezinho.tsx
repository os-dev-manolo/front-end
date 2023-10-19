import React from "react";
import { ICnae } from "../../../../shared/interfaces/IBCI";

interface Props {
    cnaes?: any;
}

export const CnaesPermitidos: React.FC<Props> = ({ cnaes }) => {
    const data: ICnae[] = [];
    cnaes?.forEach((cnae: any) => {
        cnae.forEach((p: ICnae) => {
            data.push(p);
        });
    });

    return (
        <>
            <div className="text-center  justify-center">
                <h4>Lista completa de CNAES permitidos</h4>
                {data && (
                    <table className="w-full table-auto border-2 border-black ">
                        <thead className="border-t border-2 border-black">
                            <tr className="bg-gray-300 border">
                                <th>CNAE</th>
                                <th>CÓDIGO</th>
                                <th>LEI</th>
                                <th>DESCRIÇÃO</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map(({ cnae, codigo, servicos, lei }) => {
                                return (
                                    <tr className="border px-4 py-2">
                                        <td className="border px-4 py-2">
                                            {cnae}
                                        </td>
                                        <td className="border px-4 py-2">
                                            {codigo}
                                        </td>
                                        <td className="border px-4 py-2">
                                            {lei}
                                        </td>
                                        <td className="border px-4 py-2">
                                            {servicos}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )}
            </div>
            <br />
        </>
    );
};
