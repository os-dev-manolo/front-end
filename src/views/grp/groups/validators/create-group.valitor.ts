import * as Yup from "yup";
import { IRolesResponse } from "../../../../shared/interfaces/IRoles";

const schema = Yup.object().shape({
    role_descricao: Yup.string().required("Descrição obrigatória"),
});

export const createGroupValidator = async (
    payload: Partial<IRolesResponse>
) => {
    await schema.validate(payload, {
        abortEarly: false,
    });
};
