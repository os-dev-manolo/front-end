import React from "react";

export const JacarezinhoEstacionamento: React.FC = () => {
    return (
        <>
            <h4 className="text-center">VAGAS PARA ESTACIONAMENTO</h4>
            <table className="w-full table-auto border-2 border-black">
                <thead className="border-t border-2 border-black">
                    <tr className="bg-gray-500 border">
                        <th className="border-2 border-black px-4 py-2 text-center">
                            TIPOLOGIA
                        </th>
                        <th className="border-2 border-black px-4 py-2 text-center">
                            NÚMERO DE VAGAS PARA ESTACIONAMENTO
                        </th>
                        <th className="border-2 border-black px-4 py-2 text-center">
                            OBSERVAÇÕES
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="border-2 border-black text-center">
                        <td className="border-2 border-black px-4 py-2 text-center">
                            Residência Unifamiliar
                        </td>
                        <td className="border-2 border-black px-4 py-2 text-center">
                            1 vaga
                        </td>
                        <td className="border-2 border-black px-4 py-2 text-center">
                            X
                        </td>
                    </tr>
                    <tr className="border-2 border-black text-center">
                        <td className="border-2 border-black px-4 py-2 text-center">
                            Residência Geminada
                        </td>
                        <td className="border-2 border-black px-4 py-2 text-center">
                            1 vaga para cada unidade residencial
                        </td>
                        <td className="border-2 border-black px-4 py-2 text-center">
                            X
                        </td>
                    </tr>
                    <tr className="border-2 border-black text-center">
                        <td className="border-2 border-black px-4 py-2 text-center">
                            Residência em Série ou Habitação Coletiva
                        </td>
                        <td className="border-2 border-black px-4 py-2 text-center">
                            1 vaga para cada 120 m² de área construída ou 1 vaga
                            por unidade residencial
                        </td>
                        <td className="border-2 border-black px-4 py-2 text-center">
                            X
                        </td>
                    </tr>
                    <tr className="border-2 border-black text-center">
                        <td className="border-2 border-black px-4 py-2 text-center">
                            Comércio e Prestação de Serviços e Edificações de
                            Saúde
                        </td>
                        <td className="border-2 border-black px-4 py-2 text-center">
                            1 vaga para cada 50 m² de área de comercialização
                        </td>
                        <td className="border-2 border-black px-4 py-2 text-center">
                            Dispensado para edificações térreas de até 120 m²
                        </td>
                    </tr>
                    <tr className="border-2 border-black text-center">
                        <td className="border-2 border-black px-4 py-2 text-center">
                            Supermercado e Similares
                        </td>
                        <td className="border-2 border-black px-4 py-2 text-center">
                            1 vaga para cada 25 m² de área de comercialização
                        </td>
                        <td className="border-2 border-black px-4 py-2 text-center">
                            Independente da área de estacionamento para serviço
                        </td>
                    </tr>
                    <tr className="border-2 border-black text-center">
                        <td className="border-2 border-black px-4 py-2 text-center">
                            Comércio Atacadista e Empresa de Transporte
                        </td>
                        <td className="border-2 border-black px-4 py-2 text-center">
                            1 vaga a cada 150 m² de área construída
                        </td>
                        <td className="border-2 border-black px-4 py-2 text-center">
                            Independente da área reservada para descarga
                        </td>
                    </tr>
                    <tr className="border-2 border-black text-center">
                        <td className="border-2 border-black px-4 py-2 text-center">
                            Estabelecimentos Hospitalares até 50 leitos
                        </td>
                        <td className="border-2 border-black px-4 py-2 text-center">
                            1 vaga para cada 3 leitos
                        </td>
                        <td className="border-2 border-black px-4 py-2 text-center">
                            Independente da área de estacionamento para serviço
                        </td>
                    </tr>
                    <tr className="border-2 border-black text-center">
                        <td className="border-2 border-black px-4 py-2 text-center">
                            Estabelecimentos Hospitalares acima de 50 leitos
                        </td>
                        <td className="border-2 border-black px-4 py-2 text-center">
                            1 vaga para cada 6 leitos
                        </td>
                        <td className="border-2 border-black px-4 py-2 text-center">
                            Independente da área de estacionamento para serviço
                        </td>
                    </tr>
                    <tr className="border-2 border-black text-center">
                        <td className="border-2 border-black px-4 py-2 text-center">
                            Edificações reservadas para Teatros, Cultos e
                            Cinemas
                        </td>
                        <td className="border-2 border-black px-4 py-2 text-center">
                            1 vaga para cada 75 m² que exceder 200 m² de área
                            construída
                        </td>
                        <td className="border-2 border-black px-4 py-2 text-center">
                            X
                        </td>
                    </tr>
                    <tr>
                        <td className="border-2 border-black px-4 py-2 text-center">
                            Estabelecimento de Ensino e Congêneres
                        </td>
                        <td className="border-2 border-black px-4 py-2 text-center">
                            1 vaga para cada 75 m² construídos
                        </td>
                        <td className="border-2 border-black px-4 py-2 text-center">
                            X
                        </td>
                    </tr>
                    <tr className="border-2 border-black text-center">
                        <td className="border-2 border-black px-4 py-2 text-center">
                            Hotéis e Pensões
                        </td>
                        <td className="border-2 border-black px-4 py-2 text-center">
                            1 vaga para cada 3 unidades de alojamento
                        </td>
                        <td className="border-2 border-black px-4 py-2 text-center">
                            Dispensado para edificações de até 200 m²
                        </td>
                    </tr>
                    <tr>
                        <td className="border-2 border-black px-4 py-2 text-center">
                            Instituições Bancárias
                        </td>
                        <td className="border-2 border-black px-4 py-2 text-center">
                            1 vaga para cada 50 m² de área construída
                        </td>
                        <td className="border-2 border-black px-4 py-2 text-center">
                            X
                        </td>
                    </tr>
                    <tr className="border-2 border-black text-center">
                        <td className="border-2 border-black px-4 py-2 text-center">
                            Oficina Mecânica e Funilaria
                        </td>
                        <td className="border-2 border-black px-4 py-2 text-center">
                            1 vaga para cada 40 m² que exceder 100 m² de área
                            construída
                        </td>
                        <td className="border-2 border-black px-4 py-2 text-center">
                            X
                        </td>
                    </tr>
                    <tr className="border-2 border-black text-center">
                        <td className="border-2 border-black px-4 py-2 text-center">
                            Clube Recreativo, Esportivo e Associações
                        </td>
                        <td className="border-2 border-black px-4 py-2 text-center">
                            1 vaga para cada 50 m² de área construída
                        </td>
                        <td className="border-2 border-black px-4 py-2 text-center">
                            X
                        </td>
                    </tr>
                </tbody>
            </table>
            <br />
        </>
    );
};
