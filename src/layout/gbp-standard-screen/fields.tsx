import React, { forwardRef, useImperativeHandle, useState } from "react";
import { ActionsForm } from "../../components/page-releated/grp-standard-screen/actions-form";
import { SearchParamsScreenEnum } from "../../shared/enums/search-params.enum";

interface FieldsProps {
    children: React.ReactNode;
    validator?(form: unknown): Promise<void>;
}

export interface FieldsHandles {
    open(): void;
    close(): void;
}

export const Fields = forwardRef<FieldsHandles, FieldsProps>(
    ({ children, validator }, ref) => {
        const [show, setShow] = useState(false);

        useImperativeHandle(ref, () => ({
            close: () => show && setShow(false),
            open: () => !show && setShow(true),
        }));

        if (!show) return null;

        return (
            <ActionsForm
                type={SearchParamsScreenEnum.FIELDS}
                validator={validator}
            >
                <div>{children}</div>
            </ActionsForm>
        );
    }
);
