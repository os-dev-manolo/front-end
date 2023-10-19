import { useCallback, useEffect, useState } from "react";

import { isEqual } from "lodash";
import { GrpSubMenusPathEnum } from "../enums/grp-menus.enum";
import { SearchParamsEnum } from "../enums/search-params.enum";
import {
    IGetArgs,
    StandardGrpApiService,
} from "../services/api/standard-grp-api.service";
import useAsync from "./useAsync";
import { useSearchParams } from "./useSearchParams";
import { IPaginate, IPaginateApiResponse } from "../interfaces/IPaginate";
import { IGrpStandardPageConfig } from "../interfaces/IPageConfig";

interface useStandardGrpFetchProps<T>
    extends Omit<IGetArgs, "params" | "path"> {
    subMenuPath: GrpSubMenusPathEnum;
    parseData?(data: T[]): T[];
    config: IGrpStandardPageConfig<T>;
}

export default <T>({
    relations,
    subMenuPath,
    parseData,
    config,
}: useStandardGrpFetchProps<T>) => {
    const { params, path } = useSearchParams();
    const { error, loading, run, data } = useAsync();

    const [previousParams, setPreviousParams] =
        useState<Partial<Record<SearchParamsEnum, string>>>();
    const [content, setContent] = useState<{
        data: T[];
        paginate: IPaginate;
    }>();

    const fetch = useCallback(
        (force = false) => {
            if (
                !force &&
                (!RegExp(subMenuPath).test(path) ||
                    isEqual(previousParams, params) ||
                    loading)
            )
                return;

            run(StandardGrpApiService.get)({
                path: config.api.path,
                params,
                relations,
            });

            setPreviousParams(params);
        },
        [
            params,
            path,
            previousParams,
            run,
            loading,
            relations,
            subMenuPath,
            config.api.path,
        ]
    );

    useEffect(() => {
        fetch();
    }, [fetch]);

    useEffect(() => {
        const typedData = data as IPaginateApiResponse<T[]>;
        if (error || loading || !typedData) return;

        setContent({
            data: typedData.data,
            paginate: typedData.paginate,
        });
    }, [data, error, loading, config, parseData]);

    return { fetch, loading, content };
};
