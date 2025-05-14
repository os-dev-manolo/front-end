import {
    useSearchParams as routerUseSearchParams,
    useLocation,
} from "react-router-dom";

import {
    SearchParamsEnum,
    SearchParamsScreenEnum,
} from "../enums/search-params.enum";

export function useSearchParams() {
    const [searchParams] = routerUseSearchParams();
    const location = useLocation();

    return {
        params: Object.values(SearchParamsEnum).reduce((acc, actual) => {
            const param = searchParams.get(actual);

            if (param) acc[actual] = param;

            return acc;
        }, {} as Partial<Record<SearchParamsEnum, string>>),
        path: location.pathname,
    };
}

export function setSearchParams(
    key: SearchParamsEnum | SearchParamsScreenEnum,
    value: string
) {
    const [params, setParams] = routerUseSearchParams();

    params.set(key, value);

    setParams(params, { replace: true });
}
