import { Config } from "./config";
import { GbpStandardScreen } from "../../../layout/gbp-standard-screen";

import { CreateInputs, FilterInputs, UpdateInputs } from "./components/inputs";
import tableColumns from "./components/table-columns";
import useStandardGbpFetch from "../../../shared/hooks/useStandardGbpFetch";
import { GbpSubMenusPathEnum } from "../../../shared/enums/gbp-menus.enum";
import { createOfficial } from "./validators/create.validator";
import { Official } from "../../../shared/interfaces/IPoliticalChains";

export default () => {
    const { content, fetch, loading } = useStandardGbpFetch({
        subMenuPath: GbpSubMenusPathEnum.CITIES,
        config: Config,
        relations: [],
    });
    return (
        <GbpStandardScreen
            title="LISTA MUNICÍPIOS"
            url={Config.api.path}
            filters={{ fields: FilterInputs.map((input) => input()) }}
            register={{
                fields: CreateInputs.map((input) => input()),
                validator: (form) => createOfficial(form as Partial<Official>),
            }}
            update={{
                fields: UpdateInputs.map((input) => input()),
                validator: (form) => createOfficial(form as Partial<Official>),
            }}
            columns={tableColumns}
            dataSource={content?.data}
            pagination={content?.paginate}
            loading={loading}
            reFetch={fetch}
        />
    );
};
