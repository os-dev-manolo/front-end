import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import React, { useCallback, useRef, useState } from "react";
import { FiMail, FiLock } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import { Input } from "../../../components/global";
import { showToast } from "../../../components/global/toast";
import { signinValidator } from "../../../components/page-releated/home/user/signin/validators/signin-validator";
import { ClientLogo, CompanyLogo } from "../../../shared/assets/logos";
import { useAuth } from "../../../shared/hooks/useAuth";
import { ISigninRequest } from "../../../shared/interfaces/IAuth";
import { ApiErrorHandler } from "../../../shared/utils/errors.utils";
import { yupValidation } from "../../../shared/utils/yup";

export default () => {
    const [loading, setLoading] = useState<boolean>(false);
    const formRef = useRef<FormHandles>(null);
    const { signinGrp } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = useCallback(
        async ({ email, password }: ISigninRequest) => {
            setLoading(true);
            try {
                await signinValidator({ email, password });
                await signinGrp(email, password);

                showToast({ message: "Bem vindo!", type: "success" });

                navigate("/gestor-gabinete");
            } catch (err) {
                ApiErrorHandler(err);

                const validationErrors = yupValidation(err);

                formRef.current?.setErrors(validationErrors);
            } finally {
                setLoading(false);
            }
        },
        [signinGrp, setLoading, navigate]
    );

    return (
        <div className="flex w-screen h-screen">
            <div className="flex w-full h-full justify-center items-center">
                <img
                    src={CompanyLogo}
                    alt="company logo"
                    style={{ maxWidth: "400px", maxHeight: "150px" }}
                />
            </div>

            <div className="flex flex-col w-full h-full justify-center">
                <img
                    src={ClientLogo}
                    alt="client_logo"
                    className="w-25 self-center"
                />
                <div className="w-1/2 self-center">
                    <Form className="mt-10" onSubmit={handleSubmit}>
                        <Input name="email" icon={FiMail} label="Email" />

                        <Input
                            name="password"
                            icon={FiLock}
                            type="password"
                            label="Senha"
                        />
                        <button
                            className="transition duration-300 ease-in-out w-100 p-2 bg-purple-0 text-purple-700 hover:text-white hover:bg-orange-600 rounded"
                            type="submit"
                            disabled={loading}
                        >
                            ENTRAR
                        </button>
                    </Form>
                </div>
            </div>
        </div>
    );
};
