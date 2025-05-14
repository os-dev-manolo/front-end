import { Form } from "@unform/web";
import React, { useCallback, useRef, useState, useEffect } from "react";
import {
    FiUser,
    FiInfo,
    FiSmartphone,
    FiMail,
    FiLock,
    FiUsers,
} from "react-icons/fi";
import { FormHandles } from "@unform/core";

import { UserService } from "../../../../../shared/services/api/user-api.service";
import { yupValidation } from "../../../../../shared/utils/yup";
import { SelectOptions } from "../../../../../shared/interfaces/ISelectOptions";
import { IRegisterRequest } from "../../../../../shared/interfaces/IUser";

import { signUpValidator } from "./validators/signup.validator";

import { MainButton, Input, InputMask, Select } from "../../../../global";
import { showToast } from "../../../../global/toast";
import { ApiErrorHandler } from "../../../../../shared/utils/errors.utils";
import { useRoles } from "../../../../../shared/hooks/providers/useRoles";

interface SignupFormProps {
    doAfterSignup(): void;
}

export const SignupForm: React.FC<SignupFormProps> = ({ doAfterSignup }) => {
    const { getGroupsAsOptions } = useRoles();

    const [roles, setRoles] = useState<SelectOptions[]>([]);
    const formRef = useRef<FormHandles>(null);

    const handleSubmit = useCallback(
        async (form: IRegisterRequest) => {
            try {
                await signUpValidator(form);

                const payload = {
                    ...form,
                    document: form.document.replace(/\D/gi, ""),
                    telephone: form.telephone.replace(/\D/gi, ""),
                };

                delete payload.passwordConfimartion;

                await UserService.register({ ...payload, system: "webgeo" });

                showToast({
                    type: "success",
                    message: "Usuário criado com sucesso",
                });

                doAfterSignup();
            } catch (err) {
                ApiErrorHandler(err);
                const validationErrors = yupValidation(err);

                formRef.current?.setErrors(validationErrors);
            }
        },
        [doAfterSignup]
    );

    const fetchRoles = useCallback(async () => {
        const rolesOptions = await getGroupsAsOptions();

        setRoles(rolesOptions);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        fetchRoles();
    }, [fetchRoles]);

    return (
        <Form ref={formRef} onSubmit={handleSubmit}>
            <h5 className="text-teal-900 text-center">CADASTRE-SE</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-2">
                    <Input name="name" icon={FiUser} label="Nome" />
                </div>
                <div className="col-span-2 md:col-span-1">
                    <InputMask
                        mask="999.999.999-99"
                        name="document"
                        icon={FiInfo}
                        label="CPF"
                    />
                </div>
                <div className="col-span-2 md:col-span-1">
                    <InputMask
                        mask="(99)99999-9999"
                        name="telephone"
                        icon={FiSmartphone}
                        label="Celular"
                    />
                </div>
                <div className="col-span-2">
                    <Input name="email" icon={FiMail} label="Email" />
                </div>
                <div className="col-span-2 md:col-span-1">
                    <Input
                        name="password"
                        icon={FiLock}
                        type="password"
                        label="Senha"
                    />
                </div>
                <div className="col-span-2 md:col-span-1">
                    <Input
                        name="passwordConfimartion"
                        icon={FiLock}
                        type="password"
                        label="Confirmação da senha"
                    />
                </div>
                <Select
                    name="role"
                    icon={FiUsers}
                    label="Grupo"
                    options={roles}
                />
            </div>

            <small>
                Selecione o Grupo ACESSO PÚBLICO para receber um email e ativar
                sua conta.
            </small>
            <br />
            <small>
                Os demais grupos precisam de aprovação por um usuário
                habilitado.
            </small>
            <div className="flex items-center justify-center">
                <div className="w-full md:w-3/5 h-10 mt-2">
                    <MainButton type="submit">REGISTRAR</MainButton>
                </div>
            </div>
        </Form>
    );
};
