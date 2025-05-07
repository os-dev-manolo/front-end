import { Config } from "./config";
import { GbpStandardScreen } from "../../../layout/gbp-standard-screen";

import { CreateInputs, FilterInputs, UpdateInputs } from "./components/inputs";
import tableColumns from "./components/table-columns";
import useStandardGbpFetch from "../../../shared/hooks/useStandardGbpFetch";
import { GbpSubMenusPathEnum } from "../../../shared/enums/gbp-menus.enum";
import { createPoliticalChain } from "./validators/create-validator";
import { PoliticalChain } from "../../../shared/interfaces/IPoliticalChains";

export default () => {
    const { content, fetch, loading } = useStandardGbpFetch({
        subMenuPath: GbpSubMenusPathEnum.POLITICAL_CHAINS,
        config: Config,
    });
    return (
        <GbpStandardScreen
            title="CORRENTE POLÍTICA"
            url={Config.api.path}
            filters={{ fields: FilterInputs.map((input) => input()) }}
            register={{
                fields: CreateInputs.map((input) => input()),
                validator: (form) =>
                    createPoliticalChain(form as Partial<PoliticalChain>),
            }}
            update={{
                fields: UpdateInputs.map((input) => input()),
                validator: (form) =>
                    createPoliticalChain(form as Partial<PoliticalChain>),
            }}
            columns={tableColumns}
            dataSource={content?.data}
            pagination={content?.paginate}
            loading={loading}
            reFetch={fetch}
        />
    );
};
