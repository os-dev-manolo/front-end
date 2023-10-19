import * as Yup from "yup";
import { ISigninRequest } from "../../../../../../shared/interfaces/IAuth";

const schema = Yup.object().shape({
    email: Yup.string()
        .email("Formato de email inválido")
        .required("Email obrigatório"),
    password: Yup.string().required("Senha obrigatória"),
});

export const signinValidator = async ({
    email,
    password,
}: Omit<ISigninRequest, "system">) => {
    await schema.validate(
        { email, password },
        {
            abortEarly: false,
        }
    );
};
