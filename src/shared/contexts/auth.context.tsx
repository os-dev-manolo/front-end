import React, { createContext, useCallback, useMemo, useState } from "react";
import { showToast } from "../../components/global/toast";

import UserProvider from "../providers/user";
import SessionProvider from "../providers/session";
import { IUserEntity } from "../providers/user/entities/user.entity";

export interface AuthContextData {
    user: IUserEntity;
    signed: boolean;
    signinWebgeo(email: string, password: string): Promise<void>;
    signinGrp(email: string, password: string): Promise<void>;
    signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [userData, setUserData] = useState<IUserEntity>(
        () => SessionProvider.getUser() || ({} as IUserEntity)
    );

    const signinWebgeo = useCallback(
        async (email: string, password: string) => {
            const user = await UserProvider.signinWebgeo(email, password);

            setUserData(user);
        },
        []
    );

    const signinGrp = useCallback(async (email: string, password: string) => {
        const user = await UserProvider.signinGrp(email, password);

        setUserData(user);
    }, []);

    const signOut = useCallback(() => {
        SessionProvider.clearSession();

        setUserData({} as IUserEntity);

        showToast({
            type: "success",
            message: "Até mais!",
        });

        // TODO: REMOVER QUANDO IMPLEMENTAR COMMAND PATTERN PARA O MAPA
        window.location.reload();
    }, []);

    const authContext = useMemo(
        () => ({
            user: userData,
            signed: !!userData.id,
            signinWebgeo,
            signinGrp,
            signOut,
        }),
        [userData, signinWebgeo, signinGrp, signOut]
    );

    return (
        <AuthContext.Provider value={authContext}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, AuthContext };
