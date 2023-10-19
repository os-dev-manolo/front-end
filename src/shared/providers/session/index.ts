import { StoragesService } from "../../storages/storages.service";
import { IUserEntity } from "../user/entities/user.entity";

const { localStorage } = StoragesService;

class SessionProvider {
    static setUser(user: IUserEntity) {
        localStorage.set("session@user", JSON.stringify(user));
    }

    static getUser(): IUserEntity | undefined {
        const savedUser = localStorage.getValue("session@user");

        return savedUser ? (JSON.parse(savedUser) as IUserEntity) : undefined;
    }

    static getToken() {
        return localStorage.getValue("session@token");
    }

    static setToken(token: string) {
        return localStorage.set("session@token", token);
    }

    static clearSession() {
        localStorage.delete("session@user");
        localStorage.delete("session@token");
    }
}

export default SessionProvider;
