import React from "react";
import environments from "../../../../environments";

export const Footer: React.FC = () => {
    return (
        <>
            <div className="w-full flex justify-center ">
                <small style={{ textAlign: "center", whiteSpace: "pre" }}>
                    {environments.webgeo.confrontante?.informacoesRodape}
                </small>
            </div>
            <footer className="w-full flex justify-center mt-2 mb-2">
                <small>
                    Este informe não tem valor para fins de registro em Cartório
                    de Registro de Imóveis e não substitui laudo de
                    profissional.
                </small>
            </footer>
        </>
    );
};
