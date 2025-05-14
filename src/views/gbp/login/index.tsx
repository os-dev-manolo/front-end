import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import React, { useCallback, useRef, useState } from "react";
import { FiMail, FiLock } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import { Input } from "../../../components/global";
import { showToast } from "../../../components/global/toast";
import { signinValidator } from "../../../components/page-releated/home/user/signin/validators/signin-validator";
import {
    ClientLogo,
    CompanyLogo,
    GabineteLogo,
} from "../../../shared/assets/logos";
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
                // await signinValidator({ email, password });
                // await signinGrp(email, password);

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
                <div className="w-50 self-center">
                    <Form className="m-10" onSubmit={handleSubmit}>
                        <Input name="email" label="Email" />

                        <Input name="password" type="password" label="Senha" />
                        <div>
                            <button
                                className="mt-10 transition duration-300 ease-in-out w-100 p-2 text-white rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500"
                                type="submit"
                                disabled={loading}
                            >
                                ENTRAR
                            </button>
                        </div>
                    </Form>
                    <div className="m-10">Ainda não é cadastrado?</div>
                    <button
                        className="ml-10 transition duration-300 ease-in-out w-50 p-2 bg-blue-400 text-white hover:text-blue-900 hover:bg-blue-600 rounded bg-gradient-to-r from-cyan-500 to-blue-500"
                        type="submit"
                        disabled={loading}
                    >
                        CADASTRE-SE
                    </button>
                </div>
            </div>
        </div>
    );
};

/* <div className="grid grid-cols-5 gap-2 m-20 rounded-lg justify-center">
                <div className="col-span-5 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-200">
                    <img
                        src={GabineteLogo}
                        alt="client_logo"
                        className="justify-center justify-self-center mx-auto w-25 rounded-lg self-center"
                    />
                </div>
                <div className="col-span-3 grid grid-rows-1 gap-2 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-200">
                    <img
                        src={ClientLogo}
                        alt="client_logo"
                        className="justify-center justify-self-center mx-auto w-25 border-4 border-blue-100 rounded-lg"
                    />
                    <img
                        src={CompanyLogo}
                        alt="client_logo"
                        className="justify-center justify-self-center mx-auto w-24 border-4 border-blue-100 rounded-lg"
                    />
                </div>
                <div className="col-span-2 border-2 border-green-100 rounded-lg ">
                    <Form className="m-10" onSubmit={handleSubmit}>
                        <Input name="email" label="Email" />

                        <Input name="password" type="password" label="Senha" />
                        <div>
                            <button
                                className="mt-10 transition duration-300 ease-in-out w-100 p-2 text-white rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500"
                                type="submit"
                                disabled={loading}
                            >
                                ENTRAR
                            </button>
                        </div>
                    </Form>
                    <div className="m-10">Ainda não é cadastrado?</div>
                    <button
                        className="ml-10 transition duration-300 ease-in-out w-50 p-2 bg-blue-400 text-white hover:text-blue-900 hover:bg-blue-600 rounded bg-gradient-to-r from-cyan-500 to-blue-500"
                        type="submit"
                        disabled={loading}
                    >
                        CADASTRE-SE
                    </button>
                </div>
            </div>
        </div> */
