import * as Yup from "yup";
import { Person } from "../../../../../shared/interfaces/IPerson";

const schema = Yup.object().shape({
    nome: Yup.string().required("Nome é obrigatório"),
});

export const createPerson = async (payload: Partial<Person>) => {
    await schema.validate(payload, {
        abortEarly: false,
    });
};
