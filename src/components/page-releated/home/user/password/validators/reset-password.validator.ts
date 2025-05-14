import * as Yup from "yup";

const schema = Yup.object().shape({
    previousPassword: Yup.string().required("Senha atual obrigatória"),
    newPassword: Yup.string().required("Nova senha obrigatória"),
});

export const resetPasswordValidator = async (passwords: {
    previousPassword: string;
    newPassword: string;
}) => {
    await schema.validate(passwords, {
        abortEarly: false,
    });
};
