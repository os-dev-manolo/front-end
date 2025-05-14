import { ILayers } from "../../../../shared/interfaces/ILayers";

export default (form: Partial<ILayers>) => {
    const parsedForm: Partial<ILayers> = {
        ...form,
    };

    if (!form.grpcam_id && form.grpcam_id !== 0) {
        parsedForm.grpcam_id = undefined;
    }

    if (!form.cam_ordem && form.cam_ordem !== 0) {
        parsedForm.cam_ordem = undefined;
    }

    return parsedForm;
};
