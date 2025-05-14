import IUserRepository from "../interfaces/user.repository.interface";

export default (repository: IUserRepository) =>
    async (email: string, password: string) => {
        const user = await repository.signinToWebgeo({ email, password });

        return user;
    };
