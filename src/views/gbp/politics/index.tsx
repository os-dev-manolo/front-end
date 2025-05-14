import { Config } from "./config";
import { GbpStandardScreen } from "../../../layout/gbp-standard-screen";

import { CreateInputs, FilterInputs, UpdateInputs } from "./components/inputs";
import tableColumns from "./components/table-columns";
import useStandardGbpFetch from "../../../shared/hooks/useStandardGbpFetch";
import { GbpSubMenusPathEnum } from "../../../shared/enums/gbp-menus.enum";
import { createPolitic } from "./validators/create.validator";
import { Politic } from "../../../shared/interfaces/IPoliticalChains";
import { NewPoliticForm } from "./components/forms";

export default () => {
    const { content, fetch, loading } = useStandardGbpFetch({
        subMenuPath: GbpSubMenusPathEnum.POLITICS,
        config: Config,
        relations: ["pessoa", "partido", "partido.coligacao"],
    });
    return (
        <GbpStandardScreen
            title="LISTA DE POLÍTICOS"
            url={Config.api.path}
            filters={{ fields: FilterInputs.map((input) => input()) }}
            register={{
                fields: CreateInputs.map((input) => input()),
                validator: (form) => createPolitic(form as Partial<Politic>),
                form: NewPoliticForm,
            }}
            update={{
                fields: UpdateInputs.map((input) => input()),
                validator: (form) => createPolitic(form as Partial<Politic>),
            }}
            columns={tableColumns}
            dataSource={content?.data}
            pagination={content?.paginate}
            loading={loading}
            reFetch={fetch}
        />
    );
};
