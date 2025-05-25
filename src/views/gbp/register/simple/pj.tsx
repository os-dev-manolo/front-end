import "bootstrap/dist/css/bootstrap.min.css";

import React from "react";
import { GbpStandardScreen } from "../../../../layout/gbp-standard-screen";
import { GbpSubMenusPathEnum } from "../../../../shared/enums/gbp-menus.enum";
import useStandardGbpFetch from "../../../../shared/hooks/useStandardGbpFetch";
import {
    FilterInputs,
    CreateInputs,
    UpdateInputs,
} from "./components/inputs-pj";
import tableColumns from "./components/table-columns-pj";
import { Configpj } from "./configpj";
import { createPersonpj } from "./validators/create.validatorpj";
import { LegalPerson } from "../../../../shared/interfaces/ILegalPerson";

export default () => {
    const { content, fetch, loading } = useStandardGbpFetch({
        subMenuPath: GbpSubMenusPathEnum.LEGALPERSON,
        config: Configpj,
    });
    return (
        <GbpStandardScreen
            title="PESSOA JURIDICA SIMPLIFICADO"
            url={Configpj.api.path}
            filters={{ fields: FilterInputs.map((input) => input()) }}
            register={{
                fields: CreateInputs.map((input) => input()),
                validator: (form) =>
                    createPersonpj(form as Partial<LegalPerson>),
            }}
            update={{
                fields: UpdateInputs.map((input) => input()),
                validator: (form) =>
                    createPersonpj(form as Partial<LegalPerson>),
            }}
            columns={tableColumns}
            dataSource={content?.data}
            pagination={content?.paginate}
            loading={loading}
            reFetch={fetch}
        />
    );
};
