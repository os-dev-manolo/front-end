import { ReactElement, useCallback, useRef, useState } from "react";

import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";

import { Button } from "react-bootstrap";
import { MainButton } from "../../../../components/global";
import { showToast } from "../../../../components/global/toast";
import { StandardGbpApiService } from "../../../../shared/services/api/standard-gbp-api.service";

interface NewFormProps {
    children?: React.ReactNode;
    fields?: React.ReactNode;
    title?: string;
    path: string;
    doAfterSubmit(): void;
    classNameStyle?: string;
}
export const NewForm: React.FC<NewFormProps> = ({
    children,
    fields,
    title,
    path,
    doAfterSubmit,
    classNameStyle,
}): ReactElement => {
    const formRef = useRef<FormHandles>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = useCallback(async (data: unknown) => {
        console.log(data);

        try {
            setLoading(true);
            await StandardGbpApiService.create({
                path,
                payload: data,
            });

            showToast({
                type: "success",
                message: "Item criado com sucesso",
            });
            doAfterSubmit();
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }, []);

    const handleCancel = () => {
        doAfterSubmit();
    };

    return (
        <div className="border-4">
            <div>{title}</div>
            <Form onSubmit={handleSubmit} ref={formRef} className="w-full">
                <div className={classNameStyle || "grid grid-cols-3"}>
                    {fields}
                </div>

                {children}
                <div className="flex mt-3 space-x-3.5">
                    <Button variant="success" type="submit">
                        CRIAR
                    </Button>
                    <Button
                        variant="danger"
                        type="button"
                        onClick={handleCancel}
                    >
                        CANCELAR
                    </Button>
                </div>
            </Form>
        </div>
    );
};
