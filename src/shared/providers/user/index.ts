import UserRepository from "./repository/user.repository";
import activeUserUsecase from "./usecases/active-user.usecase";
import registerUserUsecase from "./usecases/register-user.usecase";
import resetPasswordUsecase from "./usecases/reset-password.usecase";
import signinGrpUsecase from "./usecases/signin-grp.usecase";
import signinWebgeoUsecase from "./usecases/signin-webgeo.usecase";
import updatePasswordWithCodeUsecase from "./usecases/update-password-with-code.usecase";
import updatePasswordUsecase from "./usecases/update-password.usecase";

const userRepository = new UserRepository();

const UserProvider = {
    activeUser: activeUserUsecase(userRepository),
    registerUser: registerUserUsecase(userRepository),
    resetPassword: resetPasswordUsecase(userRepository),
    signinGrp: signinGrpUsecase(userRepository),
    signinWebgeo: signinWebgeoUsecase(userRepository),
    updatePassword: updatePasswordUsecase(userRepository),
    updataPasswordWithCode: updatePasswordWithCodeUsecase(userRepository),
};

export default UserProvider;
