import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

// import { Table } from "../../components/page-releated/grp-standard-screen/table";

import {
    SearchParamsEnum,
    SearchParamsScreenEnum,
} from "../../shared/enums/search-params.enum";
import { ITableColumns } from "../../shared/interfaces/ITable";
import { LocalLoading, Modal, Pagination } from "../../components/global";
import { IPaginate } from "../../shared/interfaces/IPaginate";
import { ModalHandles } from "../../components/global/modal";

import { Filters, FiltersHandles } from "./filters";
import { ActionsButtonsEnum } from "../../shared/enums/actions-buttons.enum";
import { showToast } from "../../components/global/toast";
import { StandardGrpApiService } from "../../shared/services/api/standard-grp-api.service";
import {
    ActionsFormGbp,
    ActionsFormProps,
} from "../../components/page-releated/gbp-standard-screen/actions-form";
import { HeaderGbp } from "../../components/page-releated/gbp-standard-screen/header";
import { TableTest } from "../../components/page-releated/grp-standard-screen/table/table";
import { ColumnSelector } from "../../components/page-releated/grp-standard-screen/table/selector";
import { Fields, FieldsHandles } from "./fields";

type IActions = ActionsButtonsEnum | string;

export type StandardGbpColumns<T> = (args: {
    columnClick(value: string, order: string): void;
    actionClick(state: IActions, id: number): Promise<void>;
}) => ITableColumns<Partial<T>>[];

interface GbpStandardScreenProps<T> {
    title: string;
    url: string;
    filters?: {
        fields: React.ReactNode;
        validator?(form: unknown): Promise<void>;
    };
    register?: {
        fields?: React.ReactNode;
        form?: React.FC<Omit<ActionsFormProps, "children">>;
        validator?(form: unknown): Promise<void>;
        parser?(form: unknown): unknown;
    };
    update?: {
        fields?: React.ReactNode;
        form?: React.FC<Omit<ActionsFormProps, "children">>;
        validator?(form: unknown): Promise<void>;
        parser?(form: unknown): unknown;
    };
    loading?: boolean;
    dataSource?: T[];
    columns: StandardGbpColumns<T>;
    pagination?: IPaginate;
    reFetch(force?: boolean): void;
    className?: string;
}

export function GbpStandardScreen<T>({
    title,
    url,
    filters,
    register,
    update,
    pagination,
    columns: rawColumns,
    dataSource,
    loading,
    reFetch,
    className,
}: GbpStandardScreenProps<T>) {
    const actionsModalRef = useRef<ModalHandles>(null);
    const filtersRef = useRef<FiltersHandles>(null);
    const fieldsRef = useRef<FieldsHandles>(null);

    const [actionForm, setActionForm] = useState<{
        type: SearchParamsScreenEnum;
        id?: number;
    }>();

    const [searchParams, setSearchParams] = useSearchParams();

    /**
     * @description Função responsável por atualizar os param de busca da url
     * * */
    const handleSearchParams = useCallback(
        (key: SearchParamsEnum | SearchParamsScreenEnum, value: string) => {
            searchParams.set(key, value);

            setSearchParams(searchParams, { replace: true });
        },
        [searchParams, setSearchParams]
    );

    const doAfterHeadClick = (value: string, order: string) => {
        handleSearchParams(SearchParamsEnum.ORDER, `${order}:${value}`);
    };

    const doAfterPageClick = (page: number) => {
        if (pagination)
            handleSearchParams(
                SearchParamsEnum.OFFSET,
                ((page - 1) * pagination.limit).toString()
            );
    };

    const doAfterChangeLimit = (limit: number) => {
        if (pagination)
            handleSearchParams(SearchParamsEnum.LIMIT, limit.toString());
    };

    const doAfterActionClick = async (action: IActions, id: number) => {
        switch (action) {
            case ActionsButtonsEnum.DETAILS:
                actionsModalRef.current?.open();
                setActionForm({
                    type: action as unknown as SearchParamsScreenEnum,
                    id,
                });
                break;
            case ActionsButtonsEnum.CLONE:
            case ActionsButtonsEnum.EDIT:
                actionsModalRef.current?.open();
                setActionForm({
                    type: action as unknown as SearchParamsScreenEnum,
                    id,
                });
                break;

            case ActionsButtonsEnum.DELETE:
                await StandardGrpApiService.delete({ path: url, id });
                showToast({ message: "Item removido", type: "success" });
                reFetch(true);
                // todo: abrir janela de confirmação e deletar
                break;

            default:
                // todo
                break;
        }
    };

    const handleActionFormState = useCallback(
        (state?: SearchParamsScreenEnum, id?: number) => {
            if (!state || state === actionForm?.type) {
                actionsModalRef.current?.close();
                setActionForm(undefined);

                return;
            }

            actionsModalRef.current?.open();
            setActionForm({ type: state, id });
        },
        [actionForm]
    );

    const handleFieldsState = useCallback(() => {
        const fieldsAlreadyOpened =
            searchParams.get(SearchParamsScreenEnum.FIELDS) === "true";

        if (fieldsAlreadyOpened) {
            fieldsRef.current?.close();
        } else {
            fieldsRef.current?.open();
        }

        handleSearchParams(
            SearchParamsScreenEnum.FIELDS,
            fieldsAlreadyOpened ? "false" : "true"
        );
    }, [handleSearchParams, searchParams]);

    const columns = rawColumns({
        actionClick: doAfterActionClick,
        columnClick: doAfterHeadClick,
    });

    const [visibleColumns, setVisibleColumns] = useState(columns);

    /**
     * @description Controla os estado dos filtros
     * */
    const handleFilterState = useCallback(() => {
        const filterAlreadyOpened =
            searchParams.get(SearchParamsScreenEnum.FILTERS) === "true";

        if (filterAlreadyOpened) {
            filtersRef.current?.close();
        } else {
            filtersRef.current?.open();
        }

        handleSearchParams(
            SearchParamsScreenEnum.FILTERS,
            filterAlreadyOpened ? "false" : "true"
        );
    }, [handleSearchParams, searchParams]);

    useEffect(() => {
        const shouldOpen =
            searchParams.get(SearchParamsScreenEnum.FILTERS) === "true";

        if (shouldOpen) filtersRef.current?.open();
    }, [searchParams]);

    const isEdit = actionForm?.type === SearchParamsScreenEnum.EDIT;

    return (
        <>
            <HeaderGbp
                title={title}
                doAfterFieldsClick={handleFieldsState}
                doAfterFilterClick={handleFilterState}
                doAfterRegisterClick={() =>
                    handleActionFormState(SearchParamsScreenEnum.REGISTER)
                }
            />

            <Filters ref={filtersRef}>{filters?.fields}</Filters>

            <Fields ref={fieldsRef}>
                <ColumnSelector
                    allColumns={columns}
                    visibleColumns={visibleColumns}
                    onChange={setVisibleColumns}
                />
            </Fields>

            {/* <ColumnSelector
                allColumns={columns}
                visibleColumns={visibleColumns}
                onChange={setVisibleColumns}
            /> */}

            <Modal
                handleCloseModal={handleActionFormState}
                size="xl"
                ref={actionsModalRef}
            >
                {register?.form ? (
                    <register.form
                        type={actionForm?.type}
                        id={actionForm?.id}
                    />
                ) : (
                    <ActionsFormGbp
                        key={url}
                        type={actionForm?.type}
                        url={url}
                        id={actionForm?.id}
                        doAfterSubmit={() => {
                            handleActionFormState();
                            reFetch(true);
                        }}
                        parser={isEdit ? update?.parser : register?.parser}
                        validator={
                            isEdit ? update?.validator : register?.validator
                        }
                    >
                        <div
                            className={
                                className || "py-6 grid grid-cols-2 gap-4"
                            }
                        >
                            {isEdit ? update?.fields : register?.fields}
                        </div>
                    </ActionsFormGbp>
                )}
            </Modal>

            {loading && <LocalLoading />}

            {columns && dataSource && (
                <>
                    {/* <ColumnSelector
                        allColumns={columns}
                        visibleColumns={visibleColumns}
                        onChange={setVisibleColumns}
                    /> 
                    <br /> */}
                    <TableTest
                        columns={visibleColumns}
                        dataSource={dataSource}
                    />
                </>
            )}

            {pagination && (
                <Pagination
                    doAfterChangeLimit={doAfterChangeLimit}
                    doAfterClick={doAfterPageClick}
                    maxItemsToDisplay={pagination.limit || pagination.total}
                    totalOfItems={pagination.total}
                    totalOfPages={pagination.totalPages}
                />
            )}
        </>
    );
}
