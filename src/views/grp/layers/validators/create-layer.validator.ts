import * as Yup from "yup";

const schema = Yup.object().shape({
    cam_nome_geoserver: Yup.string().required(
        "Nome da camada no geoserver obrigatório"
    ),
    cam_desc_webgeo: Yup.string().required("Nome descritivo obrigatório"),
    cam_ordem: Yup.lazy((value) =>
        value === "" ? Yup.string() : Yup.number()
    ),
    grpcam_id: Yup.lazy((value) =>
        value === "" ? Yup.string() : Yup.number()
    ),
    cam_ativa_webgeo: Yup.boolean()
        .typeError("Selecione se será exibido no Webgeo.")
        .required(),
    cam_ativa_bci: Yup.boolean()
        .typeError("Selecione se será exibido no Bci.")
        .required(),
    cam_ativa_consultaprevia: Yup.boolean()
        .typeError("Selecione se será exibido na Consulta prévia")
        .required(),
    cam_ativa_confrontante: Yup.boolean()
        .typeError("Selecione se será exibido no Confrontante")
        .required(),
    cam_ativa_login: Yup.boolean()
        .typeError("Selecione se será exibido no login.")
        .required(),
    cam_cache: Yup.boolean()
        .typeError("Selecione se possuirá cache.")
        .required(),
});

export const createLayerValidator = async (payload: unknown) => {
    await schema.validate(payload, {
        abortEarly: false,
    });
};
