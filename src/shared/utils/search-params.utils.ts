import { ICreateSearchParams } from "../interfaces/ISearchParams";

export const formatSearchParams = (searchParams: string) => {
    const searchArray = searchParams.replace("?", "").split("&");

    return searchArray.reduce((acc, current) => {
        const [key, value] = current.split("=");

        return Object.assign(acc, { [key]: value });
    }, {} as Record<string, string>);
};

/**
 * Constrói parametros de busca
 * Ex retorno: select=nome&order=ASC:nome
 * * */
export function buildApiSearchParams<T>(
    params: ICreateSearchParams<T>
): string {
    const buildedParams: string[] = [];

    Object.entries(params).forEach(([key, value]) => {
        const typedKey = key as keyof ICreateSearchParams<T>;

        switch (typedKey) {
            case "relations":
            case "select":
                buildedParams.push(`${typedKey}=${value.join(",")}`);
                break;

            case "where":
                buildedParams.push(`${typedKey}=${JSON.stringify(value)}`);
                break;

            case "order":
                buildedParams.push(
                    `${typedKey}=${value.type}:${String(value.by)}}`
                );
                break;

            default:
                buildedParams.push(
                    `${typedKey}=${value.type}:${value.toString()}}`
                );
                break;
        }
    });

    return buildedParams.join("&");
}
