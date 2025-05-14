import { IUser } from "../../../../shared/interfaces/IUser";

export default (form: Partial<IUser>) => {
    const parsedForm: Partial<IUser> & { system: "gbp" } = {
        ...form,
        system: "gbp",
    };

    parsedForm.usu_cpfcnpj = form.usu_cpfcnpj?.replace(/\D/g, "");
    parsedForm.usu_telefone = form.usu_telefone?.replace(/\D/g, "");

    return parsedForm;
};
