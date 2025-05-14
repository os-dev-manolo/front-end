/* eslint-disable jsx-a11y/control-has-associated-label */

import React from "react";

export const Tipologias: React.FC = () => {
    return (
        <>
            <h5 className="text-center">LISTA DE TIPOLOGIAS DE USO</h5>
            <table className="w-full table-auto">
                <thead className="border-t">
                    <tr className="bg-gray-200 border">
                        <th className="border px-4 py-2">USO</th>
                        <th className="border px-4 py-2">SIGLA</th>
                        <th className="border px-4 py-2">CLASSIFICAÇÃO</th>
                        <th className="border px-4 py-2">DEFINIÇÃO</th>
                        <th className="border px-4 py-2">EXEMPLOS</th>
                    </tr>
                </thead>

                <tbody className="border">
                    <tr>
                        <td className="border px-4 py-2" align="center">
                            RESIDENCIAL
                        </td>
                        <td className="border px-4 py-2" align="center">
                            RU
                        </td>
                        <td className="border px-4 py-2" align="center">
                            RESIDENCIAL UNIFAMILIAR
                        </td>
                        <td className="border px-4 py-2" align="left">
                            Edificação destinada exclusivamente ao uso
                            residencial isolada.
                        </td>
                        <td className="border px-4 py-2" align="left" />
                    </tr>
                    <tr className="bg-gray-200">
                        <td className="border px-4 py-2" align="center" />
                        <td className="border px-4 py-2" align="center">
                            RM
                        </td>
                        <td className="border px-4 py-2" align="center">
                            RESIDENCIAL MULTIFAMILIAR
                        </td>
                        <td
                            className="border px-4 py-2"
                            align="left"
                            colSpan={2}
                        >
                            Edificação usada para moradia em unidades
                            residenciais autônomas geminadas, agrupadas
                            horizontalmente em série (paralelas ou transversais
                            ao alinhamento predial), ou agrupadas verticalmente,
                            com áreas de uso coletivo. Proibida a construção de
                            residências geminadas em série paralelas ao
                            alinhamento predial nas vias perimetrais e
                            coletoras.
                        </td>
                    </tr>
                    <tr>
                        <td className="border px-4 py-2" align="center" />
                        <td className="border px-4 py-2" align="center">
                            RI
                        </td>
                        <td className="border px-4 py-2" align="center">
                            RESIDENCIAL INSTITUCIONAL
                        </td>
                        <td className="border px-4 py-2" align="left">
                            Edificação destinada ao uso residencial vinculado à
                            assistência social.{" "}
                        </td>
                        <td className="border px-4 py-2" align="left">
                            Abrigos de estudantes, asilos de idosos, albergues,
                            conventos, internatos e orfanatos.
                        </td>
                    </tr>
                    <tr className="bg-gray-200">
                        <td className="border px-4 py-2" align="center" />
                        <td className="border px-4 py-2" align="center">
                            RT
                        </td>
                        <td className="border px-4 py-2" align="center">
                            RESIDENCIAL TRANSITÓRIO
                        </td>
                        <td className="border px-4 py-2" align="left">
                            Edificação destinada à permanência temporária de
                            pessoas.{" "}
                        </td>
                        <td className="border px-4 py-2" align="left">
                            Hotéis, hotéis fazenda, hotéis de repouso,
                            apart-hotéis, motéis, pensões, pensionatos e
                            pousadas.
                        </td>
                    </tr>
                    <tr>
                        <td className="border px-4 py-2" align="center" />
                        <td className="border px-4 py-2" align="center">
                            CR
                        </td>
                        <td className="border px-4 py-2" align="center">
                            CONDOMÍNIO RESIDENCIAL
                        </td>
                        <td className="border px-4 py-2" align="left">
                            Definição e parâmetros conforme Lei de Parcelamento.
                        </td>
                        <td className="border px-4 py-2" align="left" />
                    </tr>

                    <tr className="bg-gray-200">
                        <td className="border px-4 py-2" align="center">
                            COMERCIAL E DE SERVIÇO
                        </td>
                        <td className="border px-4 py-2" align="center">
                            CE
                        </td>
                        <td className="border px-4 py-2" align="center">
                            COMERCIAL E SERVIÇO ESPECÍFICO
                        </td>
                        <td className="border px-4 py-2" align="left">
                            Atividades peculiares, vinculadas ao setor
                            industrial, de logística ou automotivo, cuja
                            adequação à vizinhança e ao sistema viário dependa
                            de análise especial, podendo ser exigido estudo
                            específico durante o processo de análise pelo órgão
                            municipal competente, como um Estudo de Impacto de
                            Vizinhança (EIV).{" "}
                        </td>
                        <td className="border px-4 py-2" align="left">
                            Capelas mortuárias, funerárias, cemitérios, postos
                            de combustíveis, serviços de bombas de combustível
                            para abastecimento de veículos, comércio varejista
                            de derivados do petróleo, vendas de veículos e
                            maquinário agrícola.
                        </td>
                    </tr>
                    <tr>
                        <td className="border px-4 py-2" align="center" />
                        <td className="border px-4 py-2" align="center">
                            CS
                        </td>
                        <td className="border px-4 py-2" align="center">
                            COMERCIAL E SERVIÇO SETORIAL
                        </td>
                        <td className="border px-4 py-2" align="left">
                            Atividades comerciais varejistas, atacadistas e de
                            prestação de serviços de grande porte (área
                            construída superior a 5.000m²), destinadas ao
                            atendimento de maior abrangência, podendo ser
                            exigido estudo específico durante o processo de
                            análise pelo órgão municipal competente, como um
                            Estudo de Impacto de Vizinhança (EIV).
                        </td>
                        <td className="border px-4 py-2" align="left">
                            Lojas de departamentos, sedes de empresas,
                            supermercados, centros comerciais, instituições
                            financeiras, hospitais.
                        </td>
                    </tr>
                    <tr className="bg-gray-200">
                        <td className="border px-4 py-2" align="center" />
                        <td className="border px-4 py-2" align="center">
                            CG
                        </td>
                        <td className="border px-4 py-2" align="center">
                            COMERCIAL E SERVIÇO GERAL
                        </td>
                        <td className="border px-4 py-2" align="left">
                            Atividades comerciais varejistas e atacadistas ou de
                            prestação de serviços destinados a atender à
                            população em geral, que, por seu porte ou natureza,
                            exijam confinamento em área própria.{" "}
                        </td>
                        <td className="border px-4 py-2" align="left">
                            Hospital veterinário, editoras, oficinas,
                            transportadoras, marmorarias, serralherias, retífica
                            de peças e motores, beneficiamento de madeiras,
                            beneficiamento de cereais e condimentos, comércio de
                            produtos e insumos agrícolas, armazéns gerais,
                            entrepostos, cooperativas.{" "}
                        </td>
                    </tr>
                    <tr>
                        <td className="border px-4 py-2" align="center" />
                        <td className="border px-4 py-2" align="center">
                            CB
                        </td>
                        <td className="border px-4 py-2" align="center">
                            COMERCIAL E SERVIÇO VICINAL E DE BAIRRO
                        </td>
                        <td className="border px-4 py-2" align="left">
                            Atividades comerciais e de prestação de serviços de
                            pequeno porte, até 200 m2, destinadas ao atendimento
                            de determinado bairro ou zona.{" "}
                        </td>
                        <td className="border px-4 py-2" align="left">
                            Escritórios e oficinas de profissionais autônomos,
                            salões de beleza, lan-houses, panificadoras,
                            lanchonetes, sapatarias, quitandas, revistarias,
                            farmácias, bares, lavanderias, estabelecimentos de
                            ensino de cursos livres. consultórios, laboratórios
                            e clínicas, agências de serviços postais, casas
                            lotéricas, imobiliárias, cartórios, açougues,
                            restaurantes, sorveterias, livrarias, serviços de
                            impressão e gráficos, sedes de entidades religiosas,
                            oficinas mecânicas e auto elétricas, vidraçarias,
                            estofarias, tapeçarias.
                        </td>
                    </tr>
                    <tr className="bg-gray-200">
                        <td className="border px-4 py-2" align="center" />
                        <td className="border px-4 py-2" align="center">
                            CR
                        </td>
                        <td className="border px-4 py-2" align="center">
                            CONDOMÍNIO RESIDENCIAL
                        </td>
                        <td className="border px-4 py-2" align="left">
                            Definição e parâmetros conforme Lei de Parcelamento.
                        </td>
                        <td className="border px-4 py-2" align="left" />
                    </tr>
                </tbody>
            </table>
        </>
    );
};
