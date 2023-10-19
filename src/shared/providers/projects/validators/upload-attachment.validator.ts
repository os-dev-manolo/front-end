import * as Yup from "yup";

export default class UploadAttachmentValidator {
    static schema = Yup.object()
        .shape({
            file: Yup.object().shape({
                name: Yup.string().required(),
            }),
        })
        .label("File");

    static validate = async (file: File) => {
        await UploadAttachmentValidator.schema.validate(file, {
            abortEarly: false,
        });
    };
}
