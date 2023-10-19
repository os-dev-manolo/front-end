import React from "react";
import { Row, Col } from "react-bootstrap";
import { IConfrontanteSide } from "../../../../../shared/providers/property/interfaces/property-confrontantes.interface";

interface ConfrontacoesProps {
    data: IConfrontanteSide[] | undefined;
    title: string;
}
export const ConfrontacoesJgv: React.FC<ConfrontacoesProps> = ({
    data,
    title,
}) => {
    return (
        <>
            <br />
            <div>
                {data && (
                    <>
                        {data.map((confrontInfo) => {
                            return (
                                <div key={confrontInfo.id}>
                                    <Row>
                                        <Col>
                                            <strong>
                                                Confrontação {title}
                                            </strong>
                                        </Col>
                                    </Row>

                                    {confrontInfo.tipo === "property" ? (
                                        <div className="w-full mt-1 mb-1">
                                            <Row>
                                                <Col>
                                                    TIPO DE CONFRONTAÇÃO:
                                                    <strong>IMÓVEL</strong>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    {`PROPRIETÁRIO: ${confrontInfo.propnome} `}
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col>
                                                    CADASTRO:{" "}
                                                    {
                                                        confrontInfo?.cadastro_confrontacao
                                                    }
                                                </Col>
                                                <Col>
                                                    INSCRIÇÃO:{" "}
                                                    {
                                                        confrontInfo?.inscricao_confrontacao
                                                    }
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col>
                                                    LOGRADOURO:{" "}
                                                    {
                                                        confrontInfo?.logradouronome
                                                    }{" "}
                                                    ,{" "}
                                                    {
                                                        confrontInfo?.logradouronumero
                                                    }
                                                </Col>
                                                <Col>
                                                    BAIRRO:{" "}
                                                    {confrontInfo?.bairronome}
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col>
                                                    QUADRA:{" "}
                                                    {confrontInfo?.quadra}
                                                </Col>
                                                <Col>
                                                    LOTE: {confrontInfo?.lote}
                                                </Col>
                                            </Row>

                                            <Row>
                                                {confrontInfo?.areaterreno && (
                                                    <Col>
                                                        ÁREA TERRENO:{" "}
                                                        {
                                                            confrontInfo?.areaterreno
                                                        }{" "}
                                                        m²
                                                    </Col>
                                                )}
                                                {confrontInfo?.areaconstruida && (
                                                    <Col>
                                                        ÁREA CONSTRUÍDA:{" "}
                                                        {
                                                            confrontInfo?.areaconstruida
                                                        }{" "}
                                                        m²
                                                    </Col>
                                                )}
                                            </Row>

                                            <Row>
                                                {confrontInfo.matricula_confrontacao && (
                                                    <Col>
                                                        MATRÍCULA :{" "}
                                                        {
                                                            confrontInfo?.matricula_confrontacao
                                                        }{" "}
                                                        m
                                                    </Col>
                                                )}
                                                {confrontInfo.medida && (
                                                    <Col>
                                                        MEDIDA DA CONFRONTAÇÃO:{" "}
                                                        {confrontInfo?.medida} m
                                                    </Col>
                                                )}
                                            </Row>
                                        </div>
                                    ) : (
                                        <div className="w-full mt-1 mb-1">
                                            <Row>
                                                <Col>
                                                    TIPO DE CONFRONTAÇÃO:{" "}
                                                    <strong>RUA</strong>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    LOGRADOURO:{" "}
                                                    {
                                                        confrontInfo?.logradouronome
                                                    }
                                                </Col>
                                                <Col>
                                                    BAIRRO:{" "}
                                                    {confrontInfo?.bairronome}
                                                </Col>
                                            </Row>

                                            <Row>
                                                {confrontInfo.medida && (
                                                    <Col>
                                                        MEDIDA DA CONFRONTAÇÃO:{" "}
                                                        {confrontInfo?.medida} m
                                                    </Col>
                                                )}
                                            </Row>
                                        </div>
                                    )}

                                    <hr />
                                </div>
                            );
                        })}
                    </>
                )}
            </div>
        </>
    );
};
