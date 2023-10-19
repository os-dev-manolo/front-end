import React, { useCallback, useEffect, useState } from "react";
import { semvApi } from "../../../../shared/services/axios/apis.service";
import { formatDataToSelectOptions } from "../../../../shared/utils/fields.utils";
import { DatePicker, Input, LocalLoading, Select } from "../../../global";

import {
    IAutocomplete,
    IGrpStandardPageConfig,
} from "../../../../shared/interfaces/IPageConfig";
import { SelectOptions } from "../../../../shared/interfaces/ISelectOptions";

interface FieldsGeneratorProps<T> {
    fields: IGrpStandardPageConfig<T>["fields"];
    exclude?: (keyof T)[];
    doAfterFetchAutocomplete?(): void;
}

export function FieldsGenerator<T>({
    fields,
    exclude,
    doAfterFetchAutocomplete,
}: FieldsGeneratorProps<T>): React.ReactElement | null {
    const [loading, setLoading] = useState<boolean>(false);
    const [options, setOptions] = useState<Record<keyof T, SelectOptions[]>>(
        {} as Record<keyof T, SelectOptions[]>
    );
    const [filteredFields, setFilteredFields] =
        useState<IGrpStandardPageConfig<T>["fields"]>();

    const fetchOptions = useCallback(
        async (field: keyof T) => {
            const autocomplete = fields[field] as IAutocomplete;
            const { data } = await semvApi.get(autocomplete.urlToFetch);

            const autoCompleteOptions = formatDataToSelectOptions(
                data.data,
                autocomplete.optionsLabel,
                autocomplete.optionsValue
            );

            setOptions({
                ...options,
                [field]: autoCompleteOptions,
            });
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [fields]
    );

    const handleFields = useCallback(async () => {
        try {
            setLoading(true);

            const filtered = Object.keys(fields)
                .filter((field) => !exclude?.includes(field as keyof T))
                .map((field) => ({
                    [field as keyof T]: fields[field as keyof T],
                }));

            await Promise.all(
                filtered
                    .filter((field) =>
                        Object.values(field).find(
                            (element) => element.fieldType === "autocomplete"
                        )
                    )
                    .map(async (field) =>
                        fetchOptions(Object.keys(field)[0] as keyof T)
                    )
            );

            const parsedFiltered = filtered.reduce(
                (acc, current) => Object.assign(acc, current),
                {} as IGrpStandardPageConfig<T>["fields"]
            );

            setFilteredFields(
                parsedFiltered as IGrpStandardPageConfig<T>["fields"]
            );

            if (doAfterFetchAutocomplete) doAfterFetchAutocomplete();
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }, [exclude, fields, fetchOptions, doAfterFetchAutocomplete]);

    useEffect(() => {
        handleFields();
    }, [handleFields]);

    if (loading || !filteredFields) return <LocalLoading />;

    return (
        <>
            {Object.entries(filteredFields).map(([key, value]) => {
                const field =
                    value as IGrpStandardPageConfig<T>["fields"][keyof IGrpStandardPageConfig<T>["fields"]];

                switch (field.fieldType) {
                    case "select":
                        return (
                            <Select
                                isClearable={field.isClearable}
                                name={key}
                                label={field.label}
                                options={field.options}
                                isDisabled={field.isDisabled}
                            />
                        );
                    case "date":
                        return <DatePicker name={key} label={field.label} />;
                    case "autocomplete":
                        return (
                            <Select
                                isClearable={field.isClearable}
                                name={key}
                                label={field.label}
                                options={options[key as keyof T]}
                                isDisabled={field.isDisabled}
                            />
                        );
                    default:
                        return (
                            <Input
                                style={{ width: "100%" }}
                                name={key}
                                label={field.label}
                                type={field.fieldType}
                            />
                        );
                }
            })}
        </>
    );
}
