import React, { useCallback } from "react";

interface PageButtonsProps {
    pageOnFocus: number;
    page: number;
    doAfterClick(clickedPage: number): void;
}

export const PageButtons: React.FC<PageButtonsProps> = ({
    pageOnFocus,
    page,
    doAfterClick,
}) => {
    const handleButtonClick = useCallback(() => {
        doAfterClick(page);
    }, [doAfterClick, page]);

    return (
        <button
            onClick={handleButtonClick}
            type="button"
            aria-current="page"
            className={`z-10 ${
                pageOnFocus === page ? "bg-indigo-50" : null
            } border-indigo-500 text-teal-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium`}
        >
            {page}
        </button>
    );
};
