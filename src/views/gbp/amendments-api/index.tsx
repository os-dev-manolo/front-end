import { Config } from "./config";
import { GbpStandardScreen } from "../../../layout/gbp-standard-screen";

import { CreateInputs, FilterInputs, UpdateInputs } from "./components/inputs";
import tableColumns from "./components/table-columns";
import useStandardGbpFetch from "../../../shared/hooks/useStandardGbpFetch";
import { GbpSubMenusPathEnum } from "../../../shared/enums/gbp-menus.enum";
import { createAmendmentsApiValidator } from "./validators/create-amendments.validator";
import { IAmendmentsApiResponse } from "../../../shared/interfaces/IAmendmentsApi";

export default () => {
    const { content, fetch, loading } = useStandardGbpFetch({
        subMenuPath: GbpSubMenusPathEnum.AMENDMENT_API,
        config: Config,
    });
    return (
        <GbpStandardScreen
            title="EMENDAS API"
            url={Config.api.path}
            filters={{ fields: FilterInputs.map((input) => input()) }}
            register={{
                fields: CreateInputs.map((input) => input()),
                validator: (form) =>
                    createAmendmentsApiValidator(
                        form as Partial<IAmendmentsApiResponse>
                    ),
            }}
            update={{
                fields: UpdateInputs.map((input) => input()),
                validator: (form) =>
                    createAmendmentsApiValidator(
                        form as Partial<IAmendmentsApiResponse>
                    ),
            }}
            columns={tableColumns}
            dataSource={content?.data}
            pagination={content?.paginate}
            loading={loading}
            reFetch={fetch}
            className="py-6 grid grid-cols-3 gap-4"
        />
    );
};
