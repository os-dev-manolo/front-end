import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { IconType } from "react-icons";
import { AiOutlineSave, AiOutlineEdit } from "react-icons/ai";
import { BiFilterAlt } from "react-icons/bi";

import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";

import {
    SearchParamsEnum,
    SearchParamsScreenEnum,
} from "../../../../shared/enums/search-params.enum";
import { ApiErrorHandler } from "../../../../shared/utils/errors.utils";
import { yupValidation } from "../../../../shared/utils/yup";

import { MainButton } from "../../../global";
import { formatFilter } from "../../../../shared/utils/fields.utils";
import { showToast } from "../../../global/toast";
import { StandardGbpApiService } from "../../../../shared/services/api/standard-gbp-api.service";

export interface ActionsFormProps {
    type?: SearchParamsScreenEnum;
    children: React.ReactNode;
    validator?(data: unknown): Promise<void>;
    parser?(data: unknown): unknown;
    formatData?(data: unknown): unknown;
    url?: string;
    id?: number;
    doAfterSubmit?(): void;
}

const Button: Record<
    SearchParamsScreenEnum,
    { label: string; Icon: IconType }
> = {
    clone: { label: "CADASTRAR", Icon: AiOutlineSave },
    register: { label: "CADASTRAR", Icon: AiOutlineSave },
    edit: { label: "EDITAR", Icon: AiOutlineEdit },
    filters: { label: "FILTRAR", Icon: BiFilterAlt },
    details: { label: "FILTRAR", Icon: BiFilterAlt },
};

const standardFormatData = (data: Record<string, any>) => {
    return Object.entries(data).reduce((acc, [key, value]) => {
        if (value === "" || value === undefined) {
            acc[key] = null;
        } else if (value === "true" || value === "false") {
            acc[key] = value === "true";
        } else {
            acc[key] = value;
        }
        return acc;
    }, {} as Record<string, any>);
};

export const ActionsFormGbp: React.FC<ActionsFormProps> = ({
    children,
    type,
    id,
    url,
    formatData,
    validator,
    doAfterSubmit,
    parser,
}) => {
    const formRef = useRef<FormHandles>(null);

    const [searchParams, setSearchParams] = useSearchParams();

    const [loading, setLoading] = useState(false);

    const handleSearchParams = useCallback(
        (key: SearchParamsEnum | SearchParamsScreenEnum, value: string) => {
            searchParams.set(key, value);

            setSearchParams(searchParams, { replace: true });
        },
        [searchParams, setSearchParams]
    );

    const handleSubmit = useCallback(
        async (data: unknown) => {
            if (!type) return;

            try {
                setLoading(true);
                if (validator) await validator(data);

                // eslint-disable-next-line no-param-reassign
                if (parser) data = parser(data);

                if (type === SearchParamsScreenEnum.FILTERS) {
                    const formatedObject = formatFilter(
                        data as Record<string, unknown>
                    );

                    handleSearchParams(
                        SearchParamsEnum.WHERE,
                        JSON.stringify(formatedObject)
                    );

                    return;
                }

                if (!url) throw new Error("url_must_be_informed");

                const formatedData = !formatData
                    ? standardFormatData(data as Record<string, string>)
                    : formatData(data);

                if (type === SearchParamsScreenEnum.EDIT && id) {
                    // eslint-disable-next-line no-param-reassign
                    (data as Record<string, unknown>).id = id;
                    await StandardGbpApiService.update({
                        path: url,
                        id,
                        payload: formatedData,
                    });

                    showToast({
                        type: "success",
                        message: "Item atualizado com sucesso",
                    });
                    if (doAfterSubmit) doAfterSubmit();

                    return;
                }

                await StandardGbpApiService.create({
                    path: url,
                    payload: formatedData,
                });

                showToast({
                    type: "success",
                    message: "Item criado com sucesso",
                });

                if (doAfterSubmit) doAfterSubmit();
            } catch (err) {
                ApiErrorHandler(err);

                const validationErrors = yupValidation(err);

                formRef.current?.setErrors(validationErrors);
            } finally {
                setLoading(false);
            }
        },
        [
            validator,
            type,
            handleSearchParams,
            url,
            id,
            formatData,
            doAfterSubmit,
        ]
    );

    useEffect(() => {
        const fetchData = async () => {
            if (!id || !url) return;
            try {
                const data = await StandardGbpApiService.readOne({
                    id,
                    path: url,
                });

                setTimeout(() => formRef.current?.setData(data), 500);
            } catch (err) {
                ApiErrorHandler(err);
            }
        };

        fetchData();
    }, [id, url]);

    return (
        <Form onSubmit={handleSubmit} ref={formRef}>
            {children}
            <MainButton
                type="submit"
                loading={loading}
                style={{ width: "24%", marginLeft: "auto", height: "40px" }}
            >
                {!!type && Button[type].Icon({})} {!!type && Button[type].label}
            </MainButton>
        </Form>
    );
};
