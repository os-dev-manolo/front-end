import { GrpStandardScreen } from "../../../layout/grp-standard-screen";
import { IUser } from "../../../shared/interfaces/IUser";
import { GrpSubMenusPathEnum } from "../../../shared/enums/grp-menus.enum";
import useStandardGrpFetch from "../../../shared/hooks/useStandardGrpFetch";
import { registerUserValidator } from "./validators/register-user.validator";
import createUserParser from "./parsers/create-user.parser";

import { CreateInputs, FilterInputs, UpdateInputs } from "./components/inputs";

import { Config } from "./config";
import tableColumns from "./components/table-columns";
import { updateUserValidator } from "./validators/update-user.validator";

export default () => {
    const { content, fetch, loading } = useStandardGrpFetch({
        config: Config,
        subMenuPath: GrpSubMenusPathEnum.USERS,
        relations: ["role"],
    });

    return (
        <GrpStandardScreen
            title="Usuários"
            url={Config.api.path}
            filters={{
                fields: (
                    <>{Object.values(FilterInputs).map((input) => input())}</>
                ),
            }}
            register={{
                validator: (form) =>
                    registerUserValidator(form as Partial<IUser>),
                fields: (
                    <>{Object.values(CreateInputs).map((input) => input())}</>
                ),
                parser: (form) => createUserParser(form as Partial<IUser>),
            }}
            update={{
                validator: (form) =>
                    updateUserValidator(form as Partial<IUser>),
                fields: (
                    <>{Object.values(UpdateInputs).map((input) => input())}</>
                ),
                parser: (form) => createUserParser(form as Partial<IUser>),
            }}
            columns={tableColumns}
            dataSource={content?.data}
            pagination={content?.paginate}
            loading={loading}
            reFetch={fetch}
        />
    );
};
