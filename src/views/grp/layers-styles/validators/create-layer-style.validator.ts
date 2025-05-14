import * as Yup from "yup";

const schema = Yup.object().shape({
    cames_nome: Yup.string().required("Nome descritivo obrigatório"),
    cames_nome_geoserver: Yup.string().required(
        "Nome do estilo no geoserver obrigatório"
    ),
    cam_id: Yup.number()
        .required("Camada relacionada obrigatório")
        .typeError("Selecione uma camada válida"),
});

export const createLayerStyleValidator = async (payload: unknown) => {
    await schema.validate(payload, {
        abortEarly: false,
    });
};
