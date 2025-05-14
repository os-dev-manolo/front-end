import { Config } from "./config";
import { GbpStandardScreen } from "../../../layout/gbp-standard-screen";

import { CreateInputs, FilterInputs, UpdateInputs } from "./components/inputs";
import tableColumns from "./components/table-columns";
import useStandardGbpFetch from "../../../shared/hooks/useStandardGbpFetch";
import { GbpSubMenusPathEnum } from "../../../shared/enums/gbp-menus.enum";
import { IAmendmentsResponse } from "../../../shared/interfaces/IAmendments";
import { createAmendmentsValidator } from "./validators/create-amendments.validator";

export default () => {
    const { content, fetch, loading } = useStandardGbpFetch({
        subMenuPath: GbpSubMenusPathEnum.AMENDMENT,
        config: Config,
    });
    return (
        <GbpStandardScreen
            title="EMENDAS"
            url={Config.api.path}
            filters={{ fields: FilterInputs.map((input) => input()) }}
            register={{
                fields: CreateInputs.map((input) => input()),
                validator: (form) =>
                    createAmendmentsValidator(
                        form as Partial<IAmendmentsResponse>
                    ),
            }}
            update={{
                fields: UpdateInputs.map((input) => input()),
                validator: (form) =>
                    createAmendmentsValidator(
                        form as Partial<IAmendmentsResponse>
                    ),
            }}
            columns={tableColumns}
            dataSource={content?.data}
            pagination={content?.paginate}
            loading={loading}
            reFetch={fetch}
        />
    );
};
