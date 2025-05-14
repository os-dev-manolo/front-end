import { IPropertyITBI } from "../interfaces/property-itbi.interface";

export interface IPropertyITBIEntity {
    readonly id: IPropertyITBI["id"];
    readonly externalId: IPropertyITBI["id_taxaseimpostos"];
    readonly owner: {
        readonly name: IPropertyITBI["nome"];
        readonly tradingName: IPropertyITBI["nome_fantasia"];
        readonly document: IPropertyITBI["cpf_cnpj"];
        readonly address: {
            readonly street: IPropertyITBI["endereco_contrib"];
            readonly district: IPropertyITBI["bairro_contrib"];
            readonly complement: IPropertyITBI["complemento"];
            readonly inlineAddress: string;
        };
    };

    readonly property: {
        readonly type: IPropertyITBI["tipo_cadastro"];
        readonly registration: IPropertyITBI["codigo_cadastro"];
        readonly address: {
            readonly street: IPropertyITBI["endereco_imovel"];
            readonly zone: string;
            readonly lote: string;
            readonly quadra: string;
            readonly district: string;
            readonly cep: string;
            inlineAddress: string;
        };
        readonly taxAddress: {
            readonly zone: IPropertyITBI["zona_fiscal"];
            readonly lote: IPropertyITBI["lote_fiscal"];
            readonly quadra: IPropertyITBI["quadra_fiscal"];
        };
    };

    year: IPropertyITBI["exercicio"];
    secretary: IPropertyITBI["sub"];
    parc: string;
    status: IPropertyITBI["situacao"];
    dueDate: string;
    value: IPropertyITBI["vrl_principal"];
    valuation: IPropertyITBI["avaliacao"];
}

const PropertyITBI = (data: IPropertyITBI): IPropertyITBIEntity => {
    const propertyITBI: IPropertyITBIEntity = {
        id: data.id,
        externalId: data.id_taxaseimpostos,
        owner: {
            name: data.nome,
            tradingName: data.nome_fantasia,
            document: data.cpf_cnpj,
            address: {
                street: data.endereco_contrib,
                district: data.bairro_contrib,
                complement: data.complemento,
                get inlineAddress() {
                    return `${this.street} - ${this.district}`.concat(
                        this.complement ? `, ${this.complement}` : ""
                    );
                },
            },
        },
        property: {
            type: "Urbano",
            registration: data.codigo_cadastro,
            address: {
                cep: data.cep,
                district: data.bairro_imovel,
                lote: data.lote_imovel,
                quadra: data.quadra_imovel,
                street: data.endereco_imovel,
                zone: data.zona_imovel,
                get inlineAddress() {
                    return `${this.street} - ${this.district}, ${this.cep}`;
                },
            },
            taxAddress: {
                lote: data.lote_fiscal,
                quadra: data.quadra_fiscal,
                zone: data.zona_fiscal,
            },
        },
        secretary: data.sub,
        parc: data.parc,
        status: data.situacao,
        valuation: data.avaliacao,
        value: data.total,
        year: data.exercicio,
        dueDate: data.vencimento,
    };

    Object.freeze(propertyITBI);

    return propertyITBI;
};

export default PropertyITBI;
