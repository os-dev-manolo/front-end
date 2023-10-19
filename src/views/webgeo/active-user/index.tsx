import React, { useCallback, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { showToast } from "../../../components/global/toast";

import { WebgeoLogo } from "../../../shared/assets/logos";
import { ApiErrorHandler } from "../../../shared/utils/errors.utils";

import UserProvider from "../../../shared/providers/user";

export const ActiveUser: React.FC = () => {
    const { search } = useLocation();

    const navigate = useNavigate();

    const validate = useCallback(async () => {
        try {
            const [code, userId] = search
                .replace("?", "")
                .split("&")
                .map((element) => element.split("=").pop());

            if (code && userId) {
                await UserProvider.activeUser(code, Number(userId));

                showToast({
                    type: "success",
                    message:
                        "Usuário validado com sucesso, redirecionaremos você para página principal em 10s",
                });

                setTimeout(() => {
                    navigate("/");
                }, 10000);
            }
        } catch (err) {
            ApiErrorHandler(err);
        }
    }, [navigate, search]);

    useEffect(() => {
        validate();
    }, [validate]);

    return (
        <div className="w-screen h-screen flex items-center justify-center flex-column">
            <img src={WebgeoLogo} alt="Logo semv" />
            <div>
                <h5 className="text-teal-900">
                    Estamos validando seu usuário aguarde um momento
                </h5>
            </div>
        </div>
    );
};
