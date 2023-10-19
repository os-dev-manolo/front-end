import React, { useCallback, useRef, useState } from "react";
import { FiMail, FiLock } from "react-icons/fi";
import { FormHandles } from "@unform/core";
import { Form as Unform } from "@unform/web";
import { ISigninRequest } from "../../../../../shared/interfaces/IAuth";
import { yupValidation } from "../../../../../shared/utils/yup";
import { Input, MainButton } from "../../../../global";

import { useAuth } from "../../../../../shared/hooks/useAuth";

import { ApiErrorHandler } from "../../../../../shared/utils/errors.utils";

import { signinValidator } from "./validators/signin-validator";

import { Line } from "./form.styles";
import { showToast } from "../../../../global/toast";
import { forgotPasswordValidator } from "./validators/forgot-password-validator";
import { UserService } from "../../../../../shared/services/api/user-api.service";

interface FormProps {
    type: "signin" | "forgotPassword";
    doAfterSendPassword(): void;
}

export const Form: React.FC<FormProps> = ({ type, doAfterSendPassword }) => {
    const formRef = useRef<FormHandles>(null);

    const { signinWebgeo } = useAuth();
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = useCallback(
        async ({ email, password }: ISigninRequest) => {
            setLoading(true);
            try {
                if (type === "signin") {
                    await signinValidator({ email, password });
                    await signinWebgeo(email, password);

                    showToast({ message: "Bem vindo!", type: "success" });

                    return;
                }

                await forgotPasswordValidator(email);

                await UserService.resetPassword(email);

                showToast({ message: "Senha enviada!", type: "success" });

                doAfterSendPassword();
            } catch (err) {
                ApiErrorHandler(err);

                const validationErrors = yupValidation(err);

                formRef.current?.setErrors(validationErrors);
            } finally {
                setLoading(false);
            }
        },
        [signinWebgeo, setLoading, type, doAfterSendPassword]
    );

    return (
        <Unform ref={formRef} onSubmit={handleSubmit}>
            <h5 className="text-teal-900 text-center">
                {type === "signin" ? "AUTENTICAR" : "RECUPERAR SENHA"}
            </h5>

            <Line />
            <Input name="email" icon={FiMail} label="Email" />

            {type === "signin" && (
                <Input
                    name="password"
                    icon={FiLock}
                    type="password"
                    label="Senha"
                />
            )}

            <Line />

            <div className="mt-3 h-10">
                <MainButton type="submit" loading={loading}>
                    {type === "signin" ? "ENTRAR" : "ENVIAR SENHA"}
                </MainButton>
            </div>
        </Unform>
    );
};
