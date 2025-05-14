import React, { useCallback, useState } from "react";
import ReactSelect from "react-select";

import { PageButtons } from "./page-buttons";

interface PaginationProps {
    pagesToShow?: number;
    totalOfPages: number;
    doAfterClick(clickedPage: number): void;
    doAfterChangeLimit?(limit: number): void;
    totalOfItems: number;
    maxItemsToDisplay: number;
}

const PaginateOptions = [
    { value: "20", label: "20 itens" },
    { value: "40", label: "40 itens" },
    { value: "60", label: "60 itens" },
    { value: "80", label: "80 itens" },
    { value: "100", label: "100 itens" },
];

export const Pagination: React.FC<PaginationProps> = ({
    pagesToShow = 5,
    doAfterClick,
    totalOfPages,
    totalOfItems,
    maxItemsToDisplay,
    doAfterChangeLimit,
}) => {
    const [pageOnFocus, setPageOnFocus] = useState<number>(1);

    const handleButtonClick = useCallback(
        (selectedPage: number) => {
            setPageOnFocus(selectedPage);
            doAfterClick(selectedPage);
        },
        [doAfterClick]
    );

    const handleNextAndPrevious = (action: "previous" | "next") => {
        if (action === "previous" && pageOnFocus < 2) return;

        const page = action === "previous" ? pageOnFocus - 1 : pageOnFocus + 1;

        setPageOnFocus(page);

        doAfterClick(page);
    };

    const renderPagesButtons = useCallback(() => {
        const buttons = [];

        const { floor } = Math;

        function displayUntil() {
            if (
                pageOnFocus + floor(pagesToShow / 2) > totalOfPages ||
                pagesToShow > totalOfPages
            )
                return totalOfPages;

            if (floor(pagesToShow / 2) >= pageOnFocus) return pagesToShow;

            return pageOnFocus + floor(pagesToShow / 2);
        }

        function initialPage() {
            if (
                floor(pagesToShow / 2) > pageOnFocus ||
                pageOnFocus - floor(pagesToShow / 2) <= 0 ||
                pagesToShow > totalOfPages
            )
                return 1;

            if (pageOnFocus + floor(pagesToShow / 2) > totalOfPages)
                return pageOnFocus === totalOfPages
                    ? totalOfPages - pagesToShow + 1
                    : totalOfPages -
                          (pagesToShow - (totalOfPages - pageOnFocus));

            return pageOnFocus - floor(pagesToShow / 2);
        }

        for (let page = initialPage(); page <= displayUntil(); page += 1) {
            buttons.push(
                <PageButtons
                    pageOnFocus={pageOnFocus}
                    page={page}
                    key={page}
                    doAfterClick={handleButtonClick}
                />
            );
        }

        return buttons;
    }, [pageOnFocus, pagesToShow, totalOfPages, handleButtonClick]);

    return (
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
                <button
                    type="button"
                    disabled={pageOnFocus < 2}
                    onClick={() => handleNextAndPrevious("previous")}
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                    ANTERIOR
                </button>
                <button
                    type="button"
                    disabled={pageOnFocus === totalOfPages}
                    onClick={() => handleNextAndPrevious("next")}
                    className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                    PRÓXIMO
                </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div className="flex items-center justify-center ">
                    <small>
                        <p className="text-purple-900">
                            Exibindo:{" "}
                            {maxItemsToDisplay * pageOnFocus > totalOfItems
                                ? totalOfItems -
                                  (pageOnFocus - 1) * maxItemsToDisplay +
                                  (pageOnFocus - 1) * maxItemsToDisplay
                                : maxItemsToDisplay * pageOnFocus}{" "}
                            de {totalOfItems} itens
                        </p>
                    </small>
                </div>
                {!!doAfterChangeLimit && (
                    <ReactSelect
                        options={PaginateOptions.filter(
                            (options, index, array) =>
                                +options.value < totalOfItems ||
                                (array.length > index &&
                                    +(array[index - 1]?.value || 0) <
                                        totalOfItems)
                        )}
                        defaultValue={PaginateOptions[0]}
                        onChange={(newValue) => {
                            if (newValue?.value) {
                                doAfterChangeLimit(+newValue.value);
                            }
                        }}
                    />
                )}
                <div>
                    <nav
                        className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                        aria-label="Pagination"
                    >
                        <button
                            type="button"
                            disabled={pageOnFocus < 2}
                            onClick={() => handleNextAndPrevious("previous")}
                            className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                        >
                            <span className="sr-only">Anterior</span>
                            <svg
                                className="h-5 w-5"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                        {renderPagesButtons()}
                        <button
                            onClick={() => handleNextAndPrevious("next")}
                            disabled={pageOnFocus === totalOfPages}
                            type="button"
                            className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                        >
                            <span className="sr-only">Próximo</span>
                            <svg
                                className="h-5 w-5"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    );
};
