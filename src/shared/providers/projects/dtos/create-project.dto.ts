export interface CreateProjectDto {
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
    counterpartValue?: number;
    attachments: { description: string; attachment: File }[];
}
