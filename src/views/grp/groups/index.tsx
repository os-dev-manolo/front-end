import { GrpStandardScreen } from "../../../layout/grp-standard-screen";

import { GrpSubMenusPathEnum } from "../../../shared/enums/grp-menus.enum";
import { IRolesResponse } from "../../../shared/interfaces/IRoles";
import useStandardGrpFetch from "../../../shared/hooks/useStandardGrpFetch";

import { Config } from "./config";
import { createGroupValidator } from "./validators/create-group.valitor";
import tableColumns from "./components/table-columns";
import { CreateInputs, FilterInputs, UpdateInputs } from "./components/inputs";

export default () => {
    const { content, fetch, loading } = useStandardGrpFetch({
        subMenuPath: GrpSubMenusPathEnum.ROLES,
        config: Config,
    });

    return (
        <GrpStandardScreen
            title="Grupos"
            url={Config.api.path}
            filters={{ fields: FilterInputs.map((input) => input()) }}
            register={{
                fields: CreateInputs.map((input) => input()),
                validator: (form) =>
                    createGroupValidator(form as Partial<IRolesResponse>),
            }}
            update={{
                fields: UpdateInputs.map((input) => input()),
                validator: (form) =>
                    createGroupValidator(form as Partial<IRolesResponse>),
            }}
            columns={tableColumns}
            dataSource={content?.data}
            pagination={content?.paginate}
            loading={loading}
            reFetch={fetch}
        />
    );
};
