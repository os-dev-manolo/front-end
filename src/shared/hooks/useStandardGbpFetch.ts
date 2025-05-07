import { useCallback, useEffect, useState } from "react";

import { isEqual } from "lodash";
import { SearchParamsEnum } from "../enums/search-params.enum";
import useAsync from "./useAsync";
import { useSearchParams } from "./useSearchParams";
import { IPaginate, IPaginateApiResponse } from "../interfaces/IPaginate";
import { GbpSubMenusPathEnum } from "../enums/gbp-menus.enum";
import {
    IGetArgs,
    StandardGbpApiService,
} from "../services/api/standard-gbp-api.service";
import { IGbpStandardPageConfig } from "../interfaces/IPageConfig";

interface useStandardGbpFetchProps<T>
    extends Omit<IGetArgs, "params" | "path"> {
    subMenuPath: GbpSubMenusPathEnum;
    parseData?(data: T[]): T[];
    config: IGbpStandardPageConfig<T>;
}

export default <T>({
    relations,
    subMenuPath,
    parseData,
    config,
}: useStandardGbpFetchProps<T>) => {
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
            run(StandardGbpApiService.get)({
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
