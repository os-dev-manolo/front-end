import { GrpStandardScreen } from "../../../layout/grp-standard-screen";
import { GrpSubMenusPathEnum } from "../../../shared/enums/grp-menus.enum";
import useStandardGrpFetch from "../../../shared/hooks/useStandardGrpFetch";

import { Config } from "./config";
import tableColumns from "./components/table-columns";
import createLayerParser from "./parsers/create-layer.parser";

import { CreateInputs, FilterInputs, UpdateInputs } from "./components/inputs";
import { createLayerValidator } from "./validators/create-layer.validator";

const RELATIONS = ["styles", "group"];

export default () => {
    const { content, fetch, loading } = useStandardGrpFetch({
        subMenuPath: GrpSubMenusPathEnum.LAYERS,
        relations: RELATIONS,
        config: Config,
    });

    return (
        <GrpStandardScreen
            title="Configuração de camadas"
            url={Config.api.path}
            columns={tableColumns}
            dataSource={content?.data}
            filters={{ fields: FilterInputs.map((input) => input()) }}
            register={{
                fields: CreateInputs.map((input) => input()),
                validator: createLayerValidator,
                parser: createLayerParser,
            }}
            update={{
                fields: UpdateInputs.map((input) => input()),
                validator: createLayerValidator,
                parser: createLayerParser,
            }}
            pagination={content?.paginate}
            loading={loading}
            reFetch={fetch}
        />
    );
};
