import React, { useCallback, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";

import { FiLock } from "react-icons/fi";
import { showToast } from "../../../components/global/toast";

import { WebgeoLogo } from "../../../shared/assets/logos";
import { UserService } from "../../../shared/services/api/user-api.service";
import { ApiErrorHandler } from "../../../shared/utils/errors.utils";
import { Input, MainButton } from "../../../components/global";

export const ResetPassword: React.FC = () => {
    const formRef = useRef<FormHandles>(null);

    const { search } = useLocation();
    const navigate = useNavigate();

    const [loading, setLoading] = useState<boolean>(false);

    const getCode = useCallback(() => {
        const [code] = search
            .replace("?", "")
            .split("&")
            .map((element) => element.split("=").pop());

        return code;
    }, [search]);

    const onSubmit = useCallback(
        async ({ newPassword }: { newPassword: string }) => {
            try {
                setLoading(true);
                const code = getCode();

                if (!code) return;

                await UserService.updatePassword({
                    code,
                    newPassword,
                });

                showToast({
                    type: "success",
                    message:
                        "Senha atualizada com sucesso, redirecionaremos você para página principal em 10s",
                });

                setTimeout(() => {
                    navigate("/");
                }, 10000);
            } catch (err) {
                ApiErrorHandler(err);
            } finally {
                setLoading(false);
            }
        },
        [navigate, getCode]
    );

    return (
        <div className="w-screen h-screen flex items-center justify-center flex-column">
            <img src={WebgeoLogo} alt="Logo semv" />
            <div>
                <Form onSubmit={onSubmit} ref={formRef}>
                    <Input
                        icon={FiLock}
                        label="Nova senha"
                        name="newPassword"
                        type="password"
                    />
                    <MainButton loading={loading} type="submit">
                        ALTERAR SENHA
                    </MainButton>
                </Form>
            </div>
        </div>
    );
};
