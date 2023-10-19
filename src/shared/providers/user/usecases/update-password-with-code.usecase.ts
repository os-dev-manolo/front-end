import IUserRepository from "../interfaces/user.repository.interface";

export default (repository: IUserRepository) =>
    async (password: string, code: string) => {
        const response = await repository.updatePassword({
            newPassword: password,
            code,
        });

        return response;
    };
