import { semvApi } from "../axios/apis.service";

export const UploadApiService = {
    async upload(
        payload: FormData
    ): Promise<{ fileName: string; destination: string }[]> {
        const { data } = await semvApi.post("/uploads", payload, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        return data.data;
    },
};
