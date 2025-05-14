import IUserRepository from "../interfaces/user.repository.interface";

const ActiveUserUsecase =
    (repository: IUserRepository) => async (code: string, userId: number) => {
        const response = await repository.activeUser(code, userId);

        return response;
    };

export default ActiveUserUsecase;
