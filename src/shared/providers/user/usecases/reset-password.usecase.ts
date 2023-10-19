import IUserRepository from "../interfaces/user.repository.interface";

export default (repository: IUserRepository) => async (email: string) => {
    const response = await repository.resetPassword(email);

    return response;
};
