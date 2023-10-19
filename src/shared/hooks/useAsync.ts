import { useReducer } from "react";

interface IData<T> {
    data?: T;
    loading: boolean;
    error: unknown;
}

interface GenericFunc<Args, Res> {
    (arg: Args): Promise<Res>;
}

interface IReducerAction<T> {
    type: "loading" | "error" | "success";
    value?: T | Error | string;
    defaultValue?: T;
}

function reducer<T>(state: IData<T>, action: IReducerAction<T>): IData<T> {
    switch (action.type) {
        case "error":
            return {
                data: action.defaultValue,
                loading: false,
                error: state.error,
            };
        case "loading":
            return {
                data: action.defaultValue,
                error: undefined,
                loading: true,
            };
        case "success":
            return {
                data: action.value as T,
                error: undefined,
                loading: false,
            };
        default:
            throw new Error("invalid_type");
    }
}

export default function useAsync<I>(defaultValue?: I) {
    const [data, dispatch] = useReducer(reducer, {
        data: defaultValue as I,
        loading: false,
        error: undefined,
    });

    function run<Args, Res>(
        asyncFunc: GenericFunc<Args, Res>
    ): GenericFunc<Args, void> {
        return async (args) => {
            dispatch({ type: "loading", defaultValue });

            try {
                const response = await asyncFunc(args);

                dispatch({ type: "success", value: response });
            } catch (err) {
                dispatch({
                    type: "error",
                    value: err,
                    defaultValue,
                });
            }
        };
    }

    return { ...data, run };
}
