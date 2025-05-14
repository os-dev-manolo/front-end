import IUserRepository from "../interfaces/user.repository.interface";

export default (repository: IUserRepository) =>
    async (previousPassword: string, newPassword: string) => {
        const response = await repository.updatePassword({
            newPassword,
            previousPassword,
        });

        return response;
    };
