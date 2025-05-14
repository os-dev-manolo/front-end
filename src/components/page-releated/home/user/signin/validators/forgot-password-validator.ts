import * as Yup from "yup";

const schema = Yup.object().shape({
    email: Yup.string()
        .email("Formato de email inválido")
        .required("Email obrigatório"),
});

export const forgotPasswordValidator = async (email: string) => {
    await schema.validate(
        { email },
        {
            abortEarly: false,
        }
    );
};
