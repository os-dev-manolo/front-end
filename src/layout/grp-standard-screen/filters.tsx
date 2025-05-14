import React, { forwardRef, useImperativeHandle, useState } from "react";
import { ActionsForm } from "../../components/page-releated/grp-standard-screen/actions-form";
import { SearchParamsScreenEnum } from "../../shared/enums/search-params.enum";

interface FiltersProps {
    children: React.ReactNode;
    validator?(form: unknown): Promise<void>;
}

export interface FiltersHandles {
    open(): void;
    close(): void;
}

export const Filters = forwardRef<FiltersHandles, FiltersProps>(
    ({ children, validator }, ref) => {
        const [show, setShow] = useState(false);

        useImperativeHandle(ref, () => ({
            close: () => show && setShow(false),
            open: () => !show && setShow(true),
        }));

        if (!show) return null;

        return (
            <ActionsForm
                type={SearchParamsScreenEnum.FILTERS}
                validator={validator}
            >
                <div className="py-6 grid grid-cols-4 gap-4">{children}</div>
            </ActionsForm>
        );
    }
);
