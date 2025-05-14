import environments from "../../../../../environments";
import { IProperty } from "../../../../../shared/interfaces/IProperties";
import { Divisor } from "../../../bci/styles";

interface Props {
    propertyInfo?: IProperty;
}

export const JczUsoSolo: React.FC<Props> = ({ propertyInfo }) => {
    const permit = propertyInfo?.zoneamento?.lei_permitidas;
    const permitidas = permit?.replace(/(<([^>]+)>)/gi, "");
    const permis = propertyInfo?.zoneamento?.lei_permissivas;
    const permissivas = permis?.replace(/(<([^>]+)>)/gi, "");
    const probid = propertyInfo?.zoneamento?.lei_proibidas;
    const proibidas = probid?.replace(/(<([^>]+)>)/gi, "");
    const cnaePermit = propertyInfo?.zoneamento?.lei_cnaes_permitidos;
    const cnaesPermitidos = cnaePermit?.replace(/(<([^>]+)>)/gi, "");

    return (
        <>
            <br />
            <Divisor />
            <div className="text-center">
                <h3>{environments.webgeo.consultaPrevia?.leiUsoDeSolo}</h3>
                <br />
                <h3>Lei no 63/2016 (ALTERAÇÃO ANEXO IV LEI NO 65/2017)</h3>
                <br />
                <table className="w-full table-auto">
                    <thead className="border-t">
                        <tr className="bg-gray-200 border">
                            <th className="border px-4 py-2">
                                LEIS PERMITIDAS
                            </th>
                            <th className="border px-4 py-2">
                                LEIS PERMISSIVAS
                            </th>
                            <th className="border px-4 py-2">LEIS PROIBIDAS</th>
                        </tr>
                    </thead>
                    <tbody className="border">
                        <tr>
                            <td className="border px-4 py-2" align="center">
                                {permitidas}
                            </td>
                            <td className="border px-4 py-2" align="center">
                                {permissivas}
                            </td>
                            <td className="border px-4 py-2" align="center">
                                {proibidas}
                            </td>
                        </tr>
                    </tbody>
                </table>

                <table className="w-full table-auto">
                    <thead className="border-t">
                        <tr className="bg-gray-200 border">
                            <th className="border px-4 py-2">
                                CNAES PERMITIDOS
                            </th>
                        </tr>
                    </thead>
                    <tbody className="border">
                        <tr>
                            <td className="border px-4 py-2" align="center">
                                {cnaesPermitidos}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <br />
            <Divisor />
            <p>
                1. H1: habitação unifamiliar / H2: habitação multifamiliar / H3:
                habitação unifamiliar em série / H4: habitação de interesse
                social / H5: habitação transitória / E1: equipamento comunitário
                local / E2: equipamento comunitário municipal / E3: equipamento
                comunitário de impacto / CS1: comércio e serviço vicinal / CS2:
                comércio e serviço de centralidade / CS3: comércio e serviço
                regional / CS4: comércio e serviço específico / I1: indústria
                caseira / I2: indústria incômoda / I3: indústria nociva / I4:
                indústria perigosa;
            </p>
            <p>
                2. É dispensado o recuo frontal até o 2º. pavimento nas
                edificações desta zona (ZCS) destinadas para fins comerciais e
                de prestação de serviços;
            </p>
            <p>
                3. Para regularização na área já consolidada, fica permitida a
                subdivisão nas construções geminadas já existentes com frente
                mínima de 6 m (seis metros) e área mínima de terrenos de 150 m²
                (cento e cinquenta metros quadrados);
            </p>
            <p>
                4. Fica permitida a regularização das subdivisões existentes,
                quando a área mínima for de 180 m² (cento e oitenta metros
                quadrados) e testada mínima de 7 m (sete metros), ou a testada
                mínima de acesso à área for de 2,50 m (dois metros e cinquenta
                centímetros), com área mínima de 200m² (duzentos metros
                quadrados).
            </p>
            <p>
                5. Nos casos de regularização, uma das edificações deve ter
                comprovação de pagamento de IPTU dos últimos 10 anos,
                devidamente averbados.
            </p>
        </>
    );
};
