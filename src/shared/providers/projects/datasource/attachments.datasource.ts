import { AxiosInstance } from "axios";
import { semvApi } from "../../../services/axios/apis.service";
import { IAttachment } from "../interfaces/attachment.interface";

export default class AttachmentsDatasource {
    private readonly api: AxiosInstance;

    constructor(api: AxiosInstance = semvApi) {
        this.api = api;
    }

    async upload(
        files: FormData
    ): Promise<{ errors: IAttachment[]; success: IAttachment[] }> {
        const {
            data: { attachments },
        } = await this.api.post<{
            attachments: { errors: IAttachment[]; success: IAttachment[] };
        }>("/projects/attachments", files, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        return attachments;
    }
}
