import { IRegisterArgs } from "../interfaces/user.datasource.interface";
import IUserRepository from "../interfaces/user.repository.interface";

export default (repository: IUserRepository) =>
    async (payload: Omit<IRegisterArgs, "system">) => {
        const response = await repository.register(payload);

        return response;
    };
