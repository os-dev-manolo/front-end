import React from "react";
import environments from "../../../../../environments";

export const JczEstacionamento: React.FC = () => {
    return (
        <>
            <table className="w-full table-auto border-2 border-black">
                <thead className="border-t border-2 border-black">
                    <tr className="bg-gray-500 border">
                        <th
                            colSpan={10}
                            className="border-2 border-black px-4 py-2 text-center"
                        >
                            {
                                environments.webgeo.consultaPrevia
                                    ?.leiVagasDeEstacionamento
                            }
                        </th>
                    </tr>
                </thead>

                <tbody>
                    <tr />
                    <tr className="bg-gray-500 border">
                        <th
                            className="border-2 border-black px-4 py-2"
                            colSpan={3}
                        >
                            USOS (6) (7) (8)
                        </th>
                        <th className="border-2 border-black px-4 py-2">
                            NÚMERO DE VAGAS VEÍCULOS LEVES
                        </th>
                        <th className="border-2 border-black px-4 py-2">
                            ÁREA DE MANOBRA/ ESTACIONAMENTO PARA CARGA/DESCARGA
                            (4) (5)
                        </th>
                        <th className="border-2 border-black px-4 py-2">
                            UNIDADES DE PROPORÇÃO
                        </th>
                    </tr>
                    <tr className="border-2 border-black text-center">
                        <td
                            className="bg-gray-500 border-2 border-black w-1/4"
                            rowSpan={16}
                        >
                            <strong>HABITAÇÃO</strong>
                        </td>
                        <td
                            className="border-2 border-black text-center"
                            colSpan={2}
                        >
                            HABITAÇÃO UNIFAMILIAR
                        </td>
                        <td className="border-2 border-black text-center">
                            1:1
                        </td>
                        <td className="border-2 border-black text-center">-</td>
                        <td className="border-2 border-black text-center">
                            Vaga para unidade habitacional
                        </td>
                    </tr>
                    <tr className="border-2 border-black text-center">
                        <td
                            className="border-2 border-black text-center"
                            rowSpan={2}
                        >
                            HABITAÇÃO MULTIFAMILIAR
                        </td>
                        <td className="border-2 border-black text-center">
                            Condomínio, Edifício horizontal, vertical ou de
                            sublotes
                        </td>
                        <td className="border-2 border-black text-center">
                            1:20
                        </td>
                        <td className="border-2 border-black text-center">-</td>
                        <td className="border-2 border-black text-center">
                            No caso de 20 unidades habitacionais ou mais:
                            acrescer 1 vaga de visitante para cada 20 vagas (1)
                        </td>
                    </tr>
                    <tr className="border-2 border-black text-center">
                        <td className="border-2 border-black text-center">
                            Quitinete, loft, estúdio
                        </td>
                        <td className="border-2 border-black text-center">
                            1:1
                        </td>
                        <td className="border-2 border-black text-center">-</td>
                        <td className="border-2 border-black text-center">
                            Vaga para unidade habitacional
                        </td>
                    </tr>
                    <tr className="border-2 border-black text-center">
                        <td
                            className="border-2 border-black text-center"
                            colSpan={2}
                        >
                            HABITAÇÃO INSTITUCIONAL
                        </td>
                        <td className="border-2 border-black text-center">
                            1:120
                        </td>
                        <td className="border-2 border-black text-center">-</td>
                        <td className="border-2 border-black text-center">
                            Vaga por m² de área construída
                        </td>
                    </tr>
                    <tr className="border-2 border-black text-center">
                        <td
                            className="border-2 border-black text-center"
                            rowSpan={12}
                        >
                            HABITAÇÃO TRANSITÓRIA (3)
                        </td>
                        <td
                            className="border-2 border-black text-center"
                            rowSpan={5}
                        >
                            Hotel, Apart-hotel
                        </td>
                        <td className="border-2 border-black text-center">
                            1:50
                        </td>
                        <td className="border-2 border-black text-center">-</td>
                        <td className="border-2 border-black text-center">
                            Vaga por m² de área útil destinada à administração
                        </td>
                    </tr>
                    <tr className="border-2 border-black text-center">
                        <td className="border-2 border-black text-center">
                            1:5
                        </td>
                        <td className="border-2 border-black text-center">-</td>
                        <td className="border-2 border-black text-center">
                            Vaga por apartamento
                        </td>
                    </tr>
                    <tr className="border-2 border-black text-center">
                        <td className="border-2 border-black text-center">
                            1:12,50
                        </td>
                        <td className="border-2 border-black text-center">-</td>
                        <td className="border-2 border-black text-center">
                            No caso de existência de salas para eventos,
                            reuniões, convenções ou similares: acrescer vaga por
                            m² de área útil destinada aos espectadores
                        </td>
                    </tr>
                    <tr className="border-2 border-black text-center">
                        <td className="border-2 border-black text-center">
                            1:25
                        </td>
                        <td className="border-2 border-black text-center">-</td>
                        <td className="border-2 border-black text-center">
                            No caso de existência de restaurante: acrescer vaga
                            por m² de área útil de salão/refeitório - destinada
                            ao público
                        </td>
                    </tr>
                    <tr className="border-2 border-black text-center">
                        <td className="border-2 border-black text-center">-</td>
                        <td className="border-2 border-black text-center">
                            1:50
                        </td>
                        <td className="border-2 border-black text-center">
                            m² de pátio de carga e descarga por m² de área
                            construída, sendo que a área minima é de 20m²
                        </td>
                    </tr>
                    <tr className="border-2 border-black text-center">
                        <td
                            className="border-2 border-black text-center"
                            rowSpan={2}
                        >
                            Motel
                        </td>
                        <td className="border-2 border-black text-center">
                            1:50
                        </td>
                        <td className="border-2 border-black text-center">-</td>
                        <td className="border-2 border-black text-center">
                            Vaga por m² de área útil destinada à administração
                        </td>
                    </tr>
                    <tr className="border-2 border-black text-center">
                        <td className="border-2 border-black text-center">
                            1:1
                        </td>
                        <td className="border-2 border-black text-center">-</td>
                        <td className="border-2 border-black text-center">
                            Vaga por apartamento
                        </td>
                    </tr>
                    <tr className="border-2 border-black text-center">
                        <td
                            className="border-2 border-black text-center"
                            rowSpan={5}
                        >
                            Hotel fazenda
                        </td>
                        <td className="border-2 border-black text-center">
                            1:50
                        </td>
                        <td className="border-2 border-black text-center">-</td>
                        <td className="border-2 border-black text-center">
                            Vaga por m² de área útil destinada à administração
                        </td>
                    </tr>
                    <tr className="border-2 border-black text-center">
                        <td className="border-2 border-black text-center">
                            1:5
                        </td>
                        <td className="border-2 border-black text-center">-</td>
                        <td className="border-2 border-black text-center">
                            Vaga por apartamento
                        </td>
                    </tr>
                    <tr className="border-2 border-black text-center">
                        <td className="border-2 border-black text-center">
                            1:12,50
                        </td>
                        <td className="border-2 border-black text-center">-</td>
                        <td className="border-2 border-black text-center">
                            No caso de existência de salas para eventos,
                            reuniões, convenções ou similares: acrescer vaga por
                            m² de área útil destinada aos espectadores
                        </td>
                    </tr>
                    <tr className="border-2 border-black text-center">
                        <td className="border-2 border-black text-center">
                            1:25
                        </td>
                        <td className="border-2 border-black text-center">-</td>
                        <td className="border-2 border-black text-center">
                            No caso de existência de restaurante: acrecer vaga
                            por m² de área útil de salão/refeitório - destinada
                            ao público
                        </td>
                    </tr>
                    <tr className="border-2 border-black text-center">
                        <td className="border-2 border-black text-center">-</td>
                        <td className="border-2 border-black text-center">
                            1:50
                        </td>
                        <td className="border-2 border-black text-center">
                            m² de pátio de carga e descarga por m² de área
                            construída, sendo que a área mínima é de 20m²
                        </td>
                    </tr>
                    <tr className="bg-gray-500 border-2 border-black">
                        <th
                            className="border-2 border-black px-4 py-2"
                            colSpan={3}
                        >
                            USOS (6) (7) (8)
                        </th>
                        <th className="border-2 border-black px-4 py-2">
                            NÚMERO DE VAGAS VEÍCULOS LEVES
                        </th>
                        <th className="border-2 border-black px-4 py-2">
                            ÁREA DE MANOBRA/ ESTACIONAMENTO PARA CARGA/DESCARGA
                            (4) (5)
                        </th>
                        <th className="border-2 border-black px-4 py-2">
                            UNIDADES DE PROPORÇÃO
                        </th>
                    </tr>
                    <tr className="border-2 border-black text-center">
                        <td
                            className="bg-gray-500 border-2 border-black"
                            rowSpan={8}
                        >
                            <strong>COMUNITÁRIO 1, 2 E 3</strong>
                        </td>
                        <td
                            className="border-2 border-black text-center"
                            rowSpan={5}
                        >
                            COMUNITÁRIO 1
                        </td>
                        <td className="border-2 border-black text-center">
                            Biblioteca
                        </td>
                        <td className="border-2 border-black text-center">
                            1:50
                        </td>
                        <td className="border-2 border-black text-center">-</td>
                        <td className="border-2 border-black text-center">
                            Vaga por m² de área total construída
                        </td>
                    </tr>
                    <tr className="border-2 border-black text-center">
                        <td className="border-2 border-black text-center">
                            Berçário / Creche
                        </td>
                        <td className="border-2 border-black text-center">
                            1:50
                        </td>
                        <td className="border-2 border-black text-center">-</td>
                        <td className="border-2 border-black text-center">
                            Vaga por m² de área construída <strong>(2)</strong>
                        </td>
                    </tr>
                    <tr className="border-2 border-black text-center">
                        <td className="border-2 border-black text-center">
                            Ensino maternal, pré-escolar, jardim de infância,
                            escola especial
                        </td>
                        <td className="border-2 border-black text-center">
                            1:50
                        </td>
                        <td className="border-2 border-black text-center">-</td>
                        <td className="border-2 border-black text-center">
                            Vaga por m² de área construída <strong>(2)</strong>
                        </td>
                    </tr>
                    <tr className="border-2 border-black text-center">
                        <td className="border-2 border-black text-center">
                            Assitência Social
                        </td>
                        <td className="border-2 border-black text-center">
                            1:50
                        </td>
                        <td className="border-2 border-black text-center">-</td>
                        <td className="border-2 border-black text-center">
                            Vaga por m² de área construída
                        </td>
                    </tr>
                    <tr className="border-2 border-black text-center">
                        <td className="border-2 border-black text-center">
                            Ambulatório
                        </td>
                        <td className="border-2 border-black text-center">
                            1:50
                        </td>
                        <td className="border-2 border-black text-center">-</td>
                        <td className="border-2 border-black text-center">
                            Vaga por m² de área construída
                        </td>
                    </tr>
                    <tr className="border-2 border-black text-center">
                        <td
                            className="border-2 border-black text-center"
                            rowSpan={3}
                        >
                            COMUNITÁRIO 2
                        </td>
                        <td
                            className="border-2 border-black text-center"
                            rowSpan={3}
                        >
                            Lazer e cultura: teatro/auditório/casa de
                            espetáculo/centro de convenções
                        </td>
                        <td className="border-2 border-black text-center">
                            1:50
                        </td>
                        <td className="border-2 border-black text-center"> </td>
                        <td className="border-2 border-black text-center">
                            Vaga por m² de área útil destinada à administração
                        </td>
                    </tr>
                    <tr>
                        <td className="border-2 border-black text-center">
                            1:12,50
                        </td>
                        <td className="border-2 border-black text-center"> </td>
                        <td className="border-2 border-black text-center">
                            Vaga por m² de área útil destinada aos espectadores
                        </td>
                    </tr>
                    <tr>
                        <td className="border-2 border-black text-center">-</td>
                        <td className="border-2 border-black text-center">
                            1:50
                        </td>
                        <td className="border-2 border-black text-center">
                            m² de pátio de carga e descarga por m² de área
                            construída, sendo que a área mínima é de 20m²
                        </td>
                    </tr>
                    <tr className="border-2 border-black text-center">
                        <td
                            className="bg-gray-500 border-2 border-black"
                            rowSpan={5}
                        >
                            <strong>COMUNITÁRIO 1, 2 E 3</strong>
                        </td>
                        <td
                            className="border-2 border-black text-center"
                            rowSpan={5}
                        >
                            COMUNITÁRIO 2
                        </td>
                        <td className="border-2 border-black text-center">
                            Ensino: Estabelecimentos de Ensino Médio e Cursos
                            Preparatórios
                        </td>
                        <td className="border-2 border-black text-center">
                            1:50
                        </td>
                        <td className="border-2 border-black text-center">-</td>
                        <td className="border-2 border-black text-center">
                            Vaga por m² de área construída <strong>(2)</strong>
                        </td>
                    </tr>
                    <tr>
                        <td
                            className="border-2 border-black text-center"
                            rowSpan={3}
                        >
                            Saúde: Maternidade, Pronto Socorro e similares
                        </td>
                        <td className="border-2 border-black text-center">-</td>
                        <td className="border-2 border-black text-center">
                            1:15
                        </td>
                        <td className="border-2 border-black text-center">
                            m² de pátio de carga e descarga por m² de área
                            construída, sendo que a área mínima é de 20m²
                        </td>
                    </tr>
                    <tr>
                        <td className="border-2 border-black text-center">
                            1:25
                        </td>
                        <td className="border-2 border-black text-center">-</td>
                        <td className="border-2 border-black text-center">
                            Vaga por m² de área construída, exceto área
                            destinada ao internamento de pacientes
                        </td>
                    </tr>
                    <tr>
                        <td className="border-2 border-black text-center">
                            1:12,50
                        </td>
                        <td className="border-2 border-black text-center">-</td>
                        <td className="border-2 border-black text-center">
                            Vaga por m² de área útil destinada ao internamento
                            de pacientes (ambulatório, UTI, quarto e similares)
                        </td>
                    </tr>
                    <tr>
                        <td className="border-2 border-black text-center">
                            Camping
                        </td>
                        <td className="border-2 border-black text-center">
                            1:25
                        </td>
                        <td className="border-2 border-black text-center">-</td>
                        <td className="border-2 border-black text-center">
                            Vaga por m² de área útil destinada à administração
                        </td>
                    </tr>
                    <tr className="bg-gray-500 border-2 border-black">
                        <th
                            className="border-2 border-black px-4 py-2"
                            colSpan={3}
                        >
                            USOS (6) (7) (8)
                        </th>
                        <th className="border-2 border-black px-4 py-2">
                            NÚMERO DE VAGAS VEÍCULOS LEVES
                        </th>
                        <th className="border-2 border-black px-4 py-2">
                            ÁREA DE MANOBRA/ ESTACIONAMENTO PARA CARGA/DESCARGA
                            (4) (5)
                        </th>
                        <th className="border-2 border-black px-4 py-2">
                            UNIDADES DE PROPORÇÃO
                        </th>
                    </tr>
                    <tr className="border-2 border-black text-center">
                        <td
                            className="bg-gray-500 border-2 border-black"
                            rowSpan={18}
                        >
                            <strong>COMÉRCIO E SERVIÇOS 1,2,3 e 4</strong>
                        </td>
                        <td
                            className="border-2 border-black text-center"
                            colSpan={2}
                            rowSpan={2}
                        >
                            Condomínio/ Centro Comercial
                        </td>
                        <td className="border-2 border-black text-center">
                            1:50 ou 1:1
                        </td>
                        <td className="border-2 border-black text-center">-</td>
                        <td className="border-2 border-black text-center">
                            Vaga por m² de área construída ou Vaga por unidade
                            autônoma, o que for maior
                        </td>
                    </tr>
                    <tr>
                        <td className="border-2 border-black text-center">-</td>
                        <td className="border-2 border-black text-center">-</td>
                        <td className="border-2 border-black text-center">
                            m² de pátio de carga e descarga por m² de área
                            construída, sendo que a área minima é de 20m²
                        </td>
                    </tr>
                    <tr>
                        <td
                            className="border-2 border-black text-center"
                            colSpan={2}
                        >
                            Panificadora e Similares
                        </td>
                        <td className="border-2 border-black text-center">
                            1:50
                        </td>
                        <td className="border-2 border-black text-center">-</td>
                        <td className="border-2 border-black text-center">
                            Vaga por m² de área construída, sendo no mínimo 2
                            vagas
                        </td>
                    </tr>
                    <tr>
                        <td
                            className="border-2 border-black text-center"
                            rowSpan={3}
                            colSpan={2}
                        >
                            Supermercado e similares
                        </td>
                        <td className="border-2 border-black text-center">
                            1:50
                        </td>
                        <td className="border-2 border-black text-center">-</td>
                        <td className="border-2 border-black text-center">
                            Vaga por m² de área destinada à administração
                        </td>
                    </tr>
                    <tr>
                        <td className="border-2 border-black text-center">
                            1:12,50
                        </td>
                        <td className="border-2 border-black text-center">-</td>
                        <td className="border-2 border-black text-center">
                            Vaga por m² de área destinada a vendas (incluindo
                            caixas e circulação)
                        </td>
                    </tr>
                    <tr>
                        <td className="border-2 border-black text-center">-</td>
                        <td className="border-2 border-black text-center">-</td>
                        <td className="border-2 border-black text-center">
                            m² de pátio de carga e descarga por m² de área
                            construída, sendo que a área minima é de 20m²
                        </td>
                    </tr>
                    <tr>
                        <td
                            className="border-2 border-black text-center"
                            colSpan={2}
                        >
                            Academia
                        </td>
                        <td className="border-2 border-black text-center">
                            1:25
                        </td>
                        <td className="border-2 border-black text-center">-</td>
                        <td className="border-2 border-black text-center">
                            Vaga por m² de área construída
                        </td>
                    </tr>
                    <tr>
                        <td
                            className="border-2 border-black text-center"
                            rowSpan={3}
                            colSpan={2}
                        >
                            Cemitério, Crematório, Capela Mortuária
                        </td>
                        <td className="border-2 border-black text-center">
                            1:50
                        </td>
                        <td className="border-2 border-black text-center">-</td>
                        <td className="border-2 border-black text-center">
                            Vaga por m² de área útil destinada à administração
                        </td>
                    </tr>
                    <tr>
                        <td className="border-2 border-black text-center">
                            10:1
                        </td>
                        <td className="border-2 border-black text-center">-</td>
                        <td className="border-2 border-black text-center">
                            Vaga por capela
                        </td>
                    </tr>
                    <tr>
                        <td className="border-2 border-black text-center">
                            1:500
                        </td>
                        <td className="border-2 border-black text-center">-</td>
                        <td className="border-2 border-black text-center">
                            Vaga por m² de área utilizada para sepultamento
                        </td>
                    </tr>
                    <tr>
                        <td
                            className="border-2 border-black text-center"
                            rowSpan={2}
                            colSpan={2}
                        >
                            Centro de Serviços/ Edifício de Escritórios/
                            Edifício Público
                        </td>
                        <td className="border-2 border-black text-center">
                            1:50 ou 1:1
                        </td>
                        <td className="border-2 border-black text-center">-</td>
                        <td className="border-2 border-black text-center">
                            Vaga por m² de área construída ou Vaga por unidade
                            autônoma, o que for maior
                        </td>
                    </tr>
                    <tr>
                        <td className="border-2 border-black text-center">-</td>
                        <td className="border-2 border-black text-center">
                            1:50
                        </td>
                        <td className="border-2 border-black text-center">
                            m² de pátio de carga e descarga por m² de área
                            construída, sendo que a área minima é de 20m²
                        </td>
                    </tr>
                    <tr>
                        <td
                            className="border-2 border-black text-center"
                            rowSpan={3}
                        >
                            Restaurante
                        </td>
                        <td className="border-2 border-black text-center">
                            Até 150,00 m²
                        </td>
                        <td className="border-2 border-black text-center">-</td>
                        <td className="border-2 border-black text-center">-</td>
                        <td className="border-2 border-black text-center">
                            Facultado
                        </td>
                    </tr>
                    <tr>
                        <td
                            className="border-2 border-black text-center"
                            rowSpan={2}
                        >
                            Acima de 150,01 m²
                        </td>
                        <td className="border-2 border-black text-center">
                            1:25
                        </td>
                        <td className="border-2 border-black text-center">-</td>
                        <td className="border-2 border-black text-center">
                            Vaga por m² de área útil de salão/ refeitório -
                            destinado ao público
                        </td>
                    </tr>
                    <tr>
                        <td className="border-2 border-black text-center">-</td>
                        <td className="border-2 border-black text-center">-</td>
                        <td className="border-2 border-black text-center">
                            m² de pátio de carga e descarga por m² de área
                            construída, sendo que a área minima é de 20m²
                        </td>
                    </tr>
                    <tr>
                        <td
                            className="border-2 border-black text-center"
                            colSpan={2}
                        >
                            Oficina mecânica e similares
                        </td>
                        <td className="border-2 border-black text-center">
                            1:12,50
                        </td>
                        <td className="border-2 border-black text-center">-</td>
                        <td className="border-2 border-black text-center">
                            Vaga por m² de área construída, sendo no mínimo 05
                            vagas
                        </td>
                    </tr>
                    <tr>
                        <td
                            className="border-2 border-black text-center"
                            rowSpan={2}
                            colSpan={2}
                        >
                            Transporte Rodoviário de Carga
                        </td>
                        <td className="border-2 border-black text-center">
                            1:100
                        </td>
                        <td className="border-2 border-black text-center">-</td>
                        <td className="border-2 border-black text-center">
                            Vaga por m² de área construída
                        </td>
                    </tr>
                    <tr>
                        <td className="border-2 border-black text-center">-</td>
                        <td className="border-2 border-black text-center">
                            1:1
                        </td>
                        <td className="border-2 border-black text-center">
                            m² de pátio de carga e descarga por m² de área
                            construída, exceto áreas cobertas destinadas à
                            manobra e estacionamento de carga/descarga
                        </td>
                    </tr>
                    <tr className="bg-gray-500 border">
                        <th
                            className="border-2 border-black px-4 py-2"
                            colSpan={3}
                        >
                            USOS (6) (7) (8)
                        </th>
                        <th className="border-2 border-black px-4 py-2">
                            NÚMERO DE VAGAS VEÍCULOS LEVES
                        </th>
                        <th className="border-2 border-black px-4 py-2">
                            ÁREA DE MANOBRA/ ESTACIONAMENTO PARA CARGA/DESCARGA
                            (4) (5)
                        </th>
                        <th className="border-2 border-black px-4 py-2">
                            UNIDADES DE PROPORÇÃO
                        </th>
                    </tr>
                    <tr className="border-2 border-black text-center">
                        <td
                            className="bg-gray-500 border-2 border-black"
                            rowSpan={9}
                        >
                            <strong>COMÉRCIO E SERVIÇOS 1,2,3 e 4</strong>
                        </td>
                        <td
                            className="border-2 border-black text-center"
                            colSpan={2}
                            rowSpan={3}
                        >
                            Shopping Center, Outlet e Similarres
                        </td>
                        <td className="border-2 border-black text-center">
                            1:50 ou 1:1
                        </td>
                        <td className="border-2 border-black text-center">-</td>
                        <td className="border-2 border-black text-center">
                            Vaga por m² de área construída ou Vaga por unidade
                            autônoma, o que for maior
                        </td>
                    </tr>
                    <tr className="border-2 border-black text-center">
                        <td className="border-2 border-black text-center">
                            1:25
                        </td>
                        <td className="border-2 border-black text-center">-</td>
                        <td className="border-2 border-black text-center">
                            Vaga por m² de área de cinemas e praças de
                            alimentação
                        </td>
                    </tr>
                    <tr className="border-2 border-black text-center">
                        <td className="border-2 border-black text-center">-</td>
                        <td className="border-2 border-black text-center">
                            1:50
                        </td>
                        <td className="border-2 border-black text-center">
                            m² de pátio de carga e descarga por m² de área
                            construída, sendo que a área minima é de 20m²
                        </td>
                    </tr>
                    <tr className="border-2 border-black text-center">
                        <td
                            className="border-2 border-black text-center"
                            colSpan={2}
                            rowSpan={3}
                        >
                            Hipermercado
                        </td>
                        <td className="border-2 border-black text-center">
                            1:50
                        </td>
                        <td className="border-2 border-black text-center">-</td>
                        <td className="border-2 border-black text-center">
                            Vaga por m² de área destinada à administração
                        </td>
                    </tr>
                    <tr className="border-2 border-black text-center">
                        <td className="border-2 border-black text-center">
                            1:12,50
                        </td>
                        <td className="border-2 border-black text-center">-</td>
                        <td className="border-2 border-black text-center">
                            Vaga por m² de área destinada a vendas (incluindo
                            caixas e circulação)
                        </td>
                    </tr>
                    <tr className="border-2 border-black text-center">
                        <td className="border-2 border-black text-center">-</td>
                        <td className="border-2 border-black text-center">
                            1:7
                        </td>
                        <td className="border-2 border-black text-center">
                            m² de pátio de carga e descarga por m² de área
                            construída, sendo que a área minima é de 20m²
                        </td>
                    </tr>
                    <tr className="border-2 border-black text-center">
                        <td
                            className="border-2 border-black text-center"
                            colSpan={2}
                        >
                            Posto de Abastecimento
                        </td>
                        <td
                            className="border-2 border-black text-center"
                            colSpan={3}
                        >
                            No caso de outros usos em conjuntos com posto de
                            abastecimento deverá ser observada a proporção de
                            vagas de estacionamento e de área de manobra de
                            carga/descarga para cada uso.
                        </td>
                    </tr>
                    <tr className="border-2 border-black text-center">
                        <td
                            className="border-2 border-black text-center"
                            rowSpan={2}
                            colSpan={2}
                        >
                            Lojas e Departamento
                        </td>
                        <td className="border-2 border-black text-center">
                            1:50
                        </td>
                        <td className="border-2 border-black text-center">-</td>
                        <td className="border-2 border-black text-center">
                            Vaga por m² de área construída
                        </td>
                    </tr>
                    <tr className="border-2 border-black text-center">
                        <td className="border-2 border-black text-center">-</td>
                        <td className="border-2 border-black text-center">
                            1:50
                        </td>
                        <td className="border-2 border-black text-center">
                            m² de pátio de carga e descarga por m² de área
                            construída, sendo que a área minima é de 20m²
                        </td>
                    </tr>
                    <tr className="border-2 border-black text-center">
                        <td
                            className="bg-gray-500 border-2 border-black"
                            rowSpan={7}
                        >
                            <strong>COMÉRCIO E SERVIÇOS 1,2,3 e 4</strong>
                        </td>
                        <td
                            className="border-2 border-black text-center"
                            rowSpan={4}
                        >
                            Uso não especificados - COMÉRCIO E SERVIÇOS 1
                        </td>
                        <td className="border-2 border-black text-center">
                            Até 150,00 m²
                        </td>
                        <td className="border-2 border-black text-center">-</td>
                        <td className="border-2 border-black text-center">-</td>
                        <td className="border-2 border-black text-center">
                            Facultado
                        </td>
                    </tr>
                    <tr className="border-2 border-black text-center">
                        <td className="border-2 border-black text-center">
                            Entre 150,01 e 300,00 m²
                        </td>
                        <td className="border-2 border-black text-center">
                            1:100
                        </td>
                        <td className="border-2 border-black text-center">-</td>
                        <td className="border-2 border-black text-center">
                            Vaga por m² de área construída
                        </td>
                    </tr>
                    <tr className="border-2 border-black text-center">
                        <td
                            className="border-2 border-black text-center"
                            rowSpan={2}
                        >
                            Acima de 300,01 m²
                        </td>
                        <td className="border-2 border-black text-center">3</td>
                        <td className="border-2 border-black text-center">-</td>
                        <td className="border-2 border-black text-center">
                            Vagas para os primeiros 300m² de área construída
                        </td>
                    </tr>
                    <tr className="border-2 border-black text-center">
                        <td className="border-2 border-black text-center">
                            1:50
                        </td>
                        <td className="border-2 border-black text-center">-</td>
                        <td className="border-2 border-black text-center">
                            Vaga por m² do restante da área construída
                        </td>
                    </tr>
                    <tr className="border-2 border-black text-center">
                        <td
                            className="border-2 border-black text-center"
                            rowSpan={3}
                        >
                            Uso não especificados - COMÉRCIO E SERVIÇOS 2,3 e 4
                        </td>
                        <td className="border-2 border-black text-center">
                            Até 300,00 m²
                        </td>
                        <td className="border-2 border-black text-center">-</td>
                        <td className="border-2 border-black text-center">
                            Vaga por m² de área construída
                        </td>
                    </tr>
                    <tr className="border-2 border-black text-center">
                        <td
                            className="border-2 border-black text-center"
                            rowSpan={2}
                        >
                            Acima de 300,01 m²
                        </td>
                        <td className="border-2 border-black text-center">3</td>
                        <td className="border-2 border-black text-center">-</td>
                        <td className="border-2 border-black text-center">
                            Vagas para os primeiros 300 m²de área construída
                        </td>
                    </tr>
                    <tr className="border-2 border-black text-center">
                        <td className="border-2 border-black text-center">
                            1:50
                        </td>
                        <td className="border-2 border-black text-center">-</td>
                        <td className="border-2 border-black text-center">
                            Vaga por m² do restante da área construída
                        </td>
                    </tr>
                    <tr className="border-2 border-black text-center">
                        <td className="bg-gray-500 border" rowSpan={2}>
                            <strong>INDUSTRIAL I1,I2 e I3</strong>
                        </td>
                        <td
                            className="border-2 border-black text-center"
                            colSpan={2}
                            rowSpan={2}
                        >
                            Industrial
                        </td>
                        <td className="border-2 border-black text-center">
                            1:100
                        </td>
                        <td className="border-2 border-black text-center">-</td>
                        <td className="border-2 border-black text-center">
                            Vaga por m² do restante da área construída
                        </td>
                    </tr>
                    <tr className="border-2 border-black text-center">
                        <td className="border-2 border-black text-center">-</td>
                        <td className="border-2 border-black text-center">
                            1:10
                        </td>
                        <td className="border-2 border-black text-center">
                            m² de pátio de carga e descarga por m² de área
                            construÍda, sendo que a área minima é de 20m²
                        </td>
                    </tr>
                </tbody>
            </table>
            <br />
        </>
    );
};
