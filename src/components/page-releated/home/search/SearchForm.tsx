import React, { useCallback, useState } from "react";
import { Form } from "@unform/web";

import { MainButton, Modal, Pagination, LocalLoading } from "../../../global";

import { PropertiesApiService } from "../../../../shared/services/api/properties-api.service";
import { useLoading } from "../../../../shared/hooks/useLoading";

import { PropertiesTable } from "../properties/properties-table";
import { SearchInputs } from "./search-inputs";
import { IProperty } from "../../../../shared/interfaces/IProperties";
import { formatFilter } from "../../../../shared/utils/fields.utils";

interface SearchFormProps {
    inputs: string[];
}

const LIMIT = 20;

export const SearchForm: React.FC<SearchFormProps> = ({ inputs }) => {
    const { setLoading } = useLoading();
    const [localLoading, setLocalLoading] = useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [properties, setProperties] = useState<Partial<IProperty>[]>([]);
    const [filters, setFilters] = useState<Record<string, string>>();
    const [propertiesAmount, setPropertiesAmount] = useState<number>(0);

    const toggleModalState = useCallback(() => {
        setShowModal(!showModal);
    }, [showModal]);

    const fechProperties = useCallback(
        async (page: number, form: Record<string, string> | undefined) => {
            const where = form ? formatFilter(form) : undefined;

            const query = `offset=${
                (page - 1) * LIMIT
            }&limit=${LIMIT}&where=${JSON.stringify(where)}`;

            const propertiesResponse =
                await PropertiesApiService.listProperties(query, ["geom"]);

            setPropertiesAmount(propertiesResponse.paginate.total);

            setProperties(propertiesResponse.data || []);
        },
        []
    );

    const handleQueryPaginate = async (page: number) => {
        try {
            setLocalLoading(true);
            await fechProperties(page, filters);
        } finally {
            setLocalLoading(false);
        }
    };

    const handleSubmit = useCallback(
        async (form: Record<string, string>) => {
            setLoading(true);
            try {
                setFilters(form);

                await fechProperties(1, form);

                toggleModalState();
            } finally {
                setLoading(false);
            }
        },
        [setLoading, toggleModalState, fechProperties]
    );

    return (
        <>
            <Modal
                show={showModal}
                handleCloseModal={toggleModalState}
                size="xl"
                title="PROPRIEDADES"
            >
                <div className="h-96">
                    {localLoading ? (
                        <LocalLoading />
                    ) : (
                        <PropertiesTable
                            properties={properties}
                            doAfterActionsClick={toggleModalState}
                        />
                    )}
                </div>

                <Pagination
                    totalOfPages={Math.ceil(propertiesAmount / LIMIT)}
                    doAfterClick={handleQueryPaginate}
                    totalOfItems={propertiesAmount}
                    maxItemsToDisplay={LIMIT}
                />
            </Modal>
            <Form onSubmit={handleSubmit}>
                {inputs.map((input) => (
                    <SearchInputs input={input} key={input} />
                ))}
                <MainButton type="submit">BUSCAR</MainButton>
            </Form>
        </>
    );
};
