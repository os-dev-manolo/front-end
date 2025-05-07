import axios, { AxiosError } from "axios";
import { showToast } from "../../../components/global/toast";
import env from "../../../environments";
import { ApiError } from "../../errors/ApiError";
import SessionProvider from "../../providers/session";

const semvApi = axios.create({
    baseURL: `${env.api.url}/v1`,
});

semvApi.interceptors.request.use((config) => {
    const token = SessionProvider.getToken();
    if (config.headers && token) {
        // eslint-disable-next-line no-param-reassign
        config.headers.Authorization = `Bearer ${token}`;
        // console.log(token);
    }

    return config;
});

semvApi.interceptors.response.use(
    (res) => res,
    (error) => {
        if (error instanceof AxiosError) {
            const { response } = error;

            if (!response) {
                return response;
            }

            if (response.status === 401) {
                SessionProvider.clearSession();
                showToast({
                    message: "Sessão expirada.",
                    type: "info",
                });
                window.location.reload();
                throw new ApiError(response.data.message);
            }

            if (response.status > 399 && response.status < 500) {
                throw new ApiError(response.data.message);
            }

            if (response.status === 500) {
                showToast({
                    message: "Ops, algo deu errado, erro 500",
                    type: "error",
                });
            }
        }

        return error;
    }
);

export { semvApi };
