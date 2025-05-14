import React, { useCallback, useRef, useState } from "react";

import { FiLock } from "react-icons/fi";

import { Form as Unform } from "@unform/web";
import { FormHandles } from "@unform/core";
import { ApiErrorHandler } from "../../../../../shared/utils/errors.utils";
import { yupValidation } from "../../../../../shared/utils/yup";
import { Input, MainButton } from "../../../../global";

import { resetPasswordValidator } from "./validators/reset-password.validator";
import { UserService } from "../../../../../shared/services/api/user-api.service";
import { showToast } from "../../../../global/toast";

interface FormProps {
    doAfterReset(): void;
}

export const Form: React.FC<FormProps> = ({ doAfterReset }) => {
    const formRef = useRef<FormHandles>(null);

    const [loading, setLoading] = useState<boolean>(false);

    const onSubmit = useCallback(
        async (form: { previousPassword: string; newPassword: string }) => {
            try {
                setLoading(true);
                await resetPasswordValidator(form);

                await UserService.updatePassword(form);

                showToast({
                    type: "success",
                    message: "Senha atualizada com sucesso",
                });

                doAfterReset();
            } catch (err) {
                ApiErrorHandler(err);

                const validationError = yupValidation(err);

                formRef.current?.setErrors(validationError);
            } finally {
                setLoading(false);
            }
        },
        [doAfterReset]
    );

    return (
        <Unform ref={formRef} onSubmit={onSubmit}>
            <Input
                icon={FiLock}
                name="previousPassword"
                type="password"
                label="Senha atual"
            />
            <Input
                icon={FiLock}
                name="newPassword"
                type="password"
                label="Nova senha"
            />
            <div className="mt-3 h-10">
                <MainButton type="submit" loading={loading}>
                    ALTERAR
                </MainButton>
            </div>
        </Unform>
    );
};
