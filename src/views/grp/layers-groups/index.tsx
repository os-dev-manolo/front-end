import { Config } from "./config";
import tableColumns from "./components/table-columns";

import { GrpStandardScreen } from "../../../layout/grp-standard-screen";
import useStandardGrpFetch from "../../../shared/hooks/useStandardGrpFetch";
import { GrpSubMenusPathEnum } from "../../../shared/enums/grp-menus.enum";
import { FilterInputs, UpdateInputs, CreateInputs } from "./components/inputs";

export default () => {
    const { content, fetch, loading } = useStandardGrpFetch({
        subMenuPath: GrpSubMenusPathEnum.LAYERS_GROUPS,
        config: Config,
    });

    return (
        <GrpStandardScreen
            title="Grupo de camadas"
            url={Config.api.path}
            filters={{ fields: FilterInputs.map((input) => input()) }}
            register={{
                fields: CreateInputs.map((input) => input()),
            }}
            update={{
                fields: UpdateInputs.map((input) => input()),
            }}
            columns={tableColumns}
            dataSource={content?.data}
            pagination={content?.paginate}
            loading={loading}
            reFetch={fetch}
        />
    );
};
