import React, { createContext, useCallback, useMemo, useReducer } from "react";

type IData<T> = {
    data: T;
    ttl?: number;
};

interface IReducerAction<T> {
    type: "set" | "remove";
    value?: IData<T>;
    key: string;
}

function reducer<T>(
    state: Record<string, IData<T>>,
    action: IReducerAction<T>
): Record<string, IData<T>> {
    switch (action.type) {
        case "set":
            return { ...state, [action.key]: action.value } as Record<
                string,
                IData<T>
            >;
        case "remove": {
            const newState = { ...state };

            delete newState[action.key];

            return newState;
        }
        default:
            throw new Error("invalid_type");
    }
}

interface StateManagerProviderProps {
    children: React.ReactNode;
}

export interface IStateManagerContextData {
    setState<T>({ key, value }: Omit<IReducerAction<T>, "type">): void;
    removeState(key: string): void;
    getState<T>(key: string): IData<T>["data"];
    states: Record<string, IData<unknown>>;
}

const StateManagerContext = createContext<IStateManagerContextData>(
    {} as IStateManagerContextData
);

const StateManagerProvider: React.FC<StateManagerProviderProps> = ({
    children,
}) => {
    const [states, dispatch] = useReducer(reducer, {});

    const setState = useCallback(function setState<T>({
        key,
        value,
    }: Omit<IReducerAction<T>, "type">) {
        dispatch({ key, value, type: "set" });
    },
    []);

    const removeState = useCallback(function removeState(key: string) {
        dispatch({ key, type: "remove" });
    }, []);

    const getState = useCallback(
        function getState<T>(key: string): T {
            return states[key].data as T;
        },
        [states]
    );

    const stateManagerContext = useMemo(
        () => ({
            setState,
            removeState,
            getState,
            states,
        }),
        [setState, removeState, getState, states]
    );

    return (
        <StateManagerContext.Provider value={stateManagerContext}>
            {children}
        </StateManagerContext.Provider>
    );
};

export { StateManagerProvider, StateManagerContext };
