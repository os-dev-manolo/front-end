import React from "react";

export const CarambeiEstacionamento: React.FC = () => {
    return (
        <div>
            <h2 className="text-center  justify-center">
                VAGAS ESTACIONAMENTO
            </h2>
            <table>
                <thead className="border-t border-2 border-black">
                    <tr className="bg-gray-500 border">
                        <th className="border-2 border-black px-4 py-2 text-center">
                            USOS
                        </th>
                        <th className="border-2 border-black px-4 py-2 text-center">
                            AS ÁREAS DE ESTACIONAMENTO DE VEÍCULOS
                        </th>
                        <th className="border-2 border-black px-4 py-2 text-center">
                            PROPORÇÃO
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="border-2 border-black">
                        <td className="border-2 border-black">
                            Toda edificação de natureza residencial, seja ela
                            unifamiliar, multifamiliar horizontal ou vertical:
                        </td>
                        <td className="border-2 border-black">
                            Deverá ser provida de vagas de estacionamento,
                            cobertas ou descobertas, dentro das divisas do lote
                            a ser edificado
                        </td>
                        <td className="border-2 border-black">
                            Uma vaga para cada 100m² de área útil que exceder a
                            30m², arredondando-se para baixo as frações iguais
                            ou inferiores a 0,50.
                        </td>
                    </tr>
                    <tr className="border-2 border-black">
                        <td className="border-2 border-black">
                            Toda edificação destinada atividade não-residencial,
                            de baixo ou de alto impacto, de qualquer porte
                        </td>
                        <td className="border-2 border-black">
                            Deverá ser provida de vagas de estacionamento,
                            cobertas ou descobertas, dentro das divisas do lote
                            a ser edificado.
                            <br />
                            <br /> <strong>OBS:</strong> Computa-se como área
                            acessível ao público, além da área de vendas das
                            unidades isoladas situadas em conjuntos coletivos
                            destinados a atividades não-residenciais, 50% da
                            área das circulações comuns, inclusive praças de
                            alimentação e recreação, onde houver.
                        </td>
                        <td className="border-2 border-black">
                            Uma vaga para cada 50m² de área acessível ao público
                            que exceder a 30m², arredondando-se para baixo as
                            frações iguais ou inferiores a 0,50.
                        </td>
                    </tr>
                    <tr className="border-2 border-black">
                        <td className="border-2 border-black">
                            Toda edificação para reuniões, culto, aulas,
                            espetáculos e atividades assemelhadas
                        </td>
                        <td className="border-2 border-black">
                            Deverá ser provida de vagas de estacionamento,
                            cobertas ou descobertas, dentro das divisas do lote
                            a ser edificado
                        </td>
                        <td className="border-2 border-black">
                            Uma vaga para cada 50m² de área acessível ao público
                            que exceder a 200m², arredondando-se para baixo as
                            frações iguais ou inferiores a 0,50.
                        </td>
                    </tr>
                    <tr className="border-2 border-black">
                        <td className="border-2 border-black">
                            As edificações para atividade não-residencial de
                            baixo ou de alto impacto, de qualquer porte, que
                            tenham compartimento destinado a depósito de
                            qualquer natureza
                        </td>
                        <td className="border-2 border-black">
                            As edificações para atividade não-residencial de
                            baixo ou de alto impacto, de qualquer porte, que
                            tenham compartimento destinado a depósito de
                            qualquer natureza Deverão prover, adicionalmente às
                            vagas de estacionamento estabelecidas pelo Art. 23
                            desta lei, vagas adicionais para veículos de carga.
                            <br />
                            <br /> <strong>Parágrafo único – </strong>É
                            terminantemente proibido que o espaço de
                            estacionamento de que trata o caput deste artigo,
                            bem como o espaço necessário para as manobras
                            efetuadas pelos veículos de carga, ocupe espaço fora
                            das divisas do lote a edificar.
                        </td>
                        <td className="border-2 border-black">
                            Uma vaga para cada 200m² ou fração de área útil de
                            depósito que exceder a 100m², com largura mínima de
                            3,00m e comprimento mínimo de 7,50m.
                        </td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={3}>
                            OBS: As dimensões normais das vagas de
                            estacionamento serão 2,50m de largura por 5,00m de
                            comprimento, podendo ser admitidas que até 50% das
                            vagas necessárias tenham a largura reduzida a 2,25m
                            e o comprimento reduzido a 4,50m.
                        </td>
                    </tr>
                </tfoot>
            </table>
            <br />
        </div>
    );
};
