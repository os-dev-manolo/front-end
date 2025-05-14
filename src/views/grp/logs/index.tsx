import { GrpStandardScreen } from "../../../layout/grp-standard-screen";
import { FieldsGenerator } from "../../../components/page-releated/grp-standard-screen/fields/generate";
import useStandardGrpFetch from "../../../shared/hooks/useStandardGrpFetch";
import { GrpSubMenusPathEnum } from "../../../shared/enums/grp-menus.enum";

import { Config } from "./config";
import tableColumns from "./table-columns";

const RELATIONS = ["user"];

export default () => {
    const { content, fetch, loading } = useStandardGrpFetch({
        subMenuPath: GrpSubMenusPathEnum.LOGS,
        config: Config,
        relations: RELATIONS,
    });

    return (
        <GrpStandardScreen
            title="Logs"
            url={Config.api.path}
            filters={{ fields: <FieldsGenerator fields={Config.fields} /> }}
            columns={tableColumns}
            dataSource={content?.data}
            pagination={content?.paginate}
            loading={loading}
            reFetch={fetch}
        />
    );
};
