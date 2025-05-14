export interface IRegisterProjectForm {
    tracker: number;
    work: string;
    street: string;
    number: number;
    zipcode: string;
    secretary: string;
    cnpj: string;
    ressource: string;
    value: number;
    description: string;
    descriptionFile?: File;
    attachments?: Record<string, File | undefined>;
}
