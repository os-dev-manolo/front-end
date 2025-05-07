import "bootstrap/dist/css/bootstrap.min.css";

import React from "react";
import { GbpStandardScreen } from "../../../../layout/gbp-standard-screen";
import { GbpSubMenusPathEnum } from "../../../../shared/enums/gbp-menus.enum";
import useStandardGbpFetch from "../../../../shared/hooks/useStandardGbpFetch";
import { Person } from "../../../../shared/interfaces/IPerson";
import { FilterInputs, CreateInputs, UpdateInputs } from "./components/inputs";
import tableColumns from "./components/table-columns";
import { Config } from "./config";
import { createPerson } from "./validators/create.validator";

export default () => {
    const { content, fetch, loading } = useStandardGbpFetch({
        subMenuPath: GbpSubMenusPathEnum.PERSON,
        config: Config,
    });
    return (
        <GbpStandardScreen
            title="PESSOA FÍSICA"
            url={Config.api.path}
            filters={{ fields: FilterInputs.map((input) => input()) }}
            register={{
                fields: CreateInputs.map((input) => input()),
                validator: (form) => createPerson(form as Partial<Person>),
            }}
            update={{
                fields: UpdateInputs.map((input) => input()),
                validator: (form) => createPerson(form as Partial<Person>),
            }}
            columns={tableColumns}
            dataSource={content?.data}
            pagination={content?.paginate}
            loading={loading}
            reFetch={fetch}
        />
    );
};
