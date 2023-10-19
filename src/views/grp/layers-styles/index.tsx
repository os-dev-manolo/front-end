import { GrpStandardScreen } from "../../../layout/grp-standard-screen";
import { Config } from "./config";
import { GrpSubMenusPathEnum } from "../../../shared/enums/grp-menus.enum";
import useStandardGrpFetch from "../../../shared/hooks/useStandardGrpFetch";
import { createLayerStyleValidator } from "./validators/create-layer-style.validator";
import tableColumns from "./components/table-columns";
import { CreateInputs, FilterInputs, UpdateInputs } from "./components/inputs";

export default () => {
    const { content, fetch, loading } = useStandardGrpFetch({
        subMenuPath: GrpSubMenusPathEnum.LAYERS_STYLES,
        config: Config,
        relations: ["layers"],
    });

    return (
        <GrpStandardScreen
            title="Estilos das camadas"
            url={Config.api.path}
            filters={{ fields: FilterInputs.map((input) => input()) }}
            register={{
                fields: CreateInputs.map((input) => input()),
                validator: (form) => createLayerStyleValidator(form),
            }}
            update={{
                fields: UpdateInputs.map((input) => input()),
                validator: (form) => createLayerStyleValidator(form),
            }}
            columns={tableColumns}
            dataSource={content?.data}
            pagination={content?.paginate}
            loading={loading}
            reFetch={fetch}
        />
    );
};
