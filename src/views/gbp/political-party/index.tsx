import { Config } from "./config";
import { GbpStandardScreen } from "../../../layout/gbp-standard-screen";

import { CreateInputs, FilterInputs, UpdateInputs } from "./components/inputs";
import tableColumns from "./components/table-columns";
import useStandardGbpFetch from "../../../shared/hooks/useStandardGbpFetch";
import { GbpSubMenusPathEnum } from "../../../shared/enums/gbp-menus.enum";
import { createPoliticalParty } from "./validators/create.validator";
import { PoliticalParty } from "../../../shared/interfaces/IPoliticalChains";

export default () => {
    const { content, fetch, loading } = useStandardGbpFetch({
        subMenuPath: GbpSubMenusPathEnum.POLITICAL_PARTIES,
        config: Config,
        relations: ["coligacao"],
    });
    return (
        <GbpStandardScreen
            title="PARTIDOS POLÍTICOS"
            url={Config.api.path}
            filters={{ fields: FilterInputs.map((input) => input()) }}
            register={{
                fields: CreateInputs.map((input) => input()),
                validator: (form) =>
                    createPoliticalParty(form as Partial<PoliticalParty>),
            }}
            update={{
                fields: UpdateInputs.map((input) => input()),
                validator: (form) =>
                    createPoliticalParty(form as Partial<PoliticalParty>),
            }}
            columns={tableColumns}
            dataSource={content?.data}
            pagination={content?.paginate}
            loading={loading}
            reFetch={fetch}
        />
    );
};
