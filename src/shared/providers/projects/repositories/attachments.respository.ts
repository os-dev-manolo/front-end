import AttachmentsDatasource from "../datasource/attachments.datasource";

export default class AttachmentsRepository {
    private readonly datasource: AttachmentsDatasource;

    constructor(
        datasource: AttachmentsDatasource = new AttachmentsDatasource()
    ) {
        this.datasource = datasource;
    }

    async upload(files: File[]) {
        const filesForm = new FormData();

        files.forEach((file) => filesForm.append("files", file));

        const attachments = await this.datasource.upload(filesForm);

        return attachments;
    }
}
