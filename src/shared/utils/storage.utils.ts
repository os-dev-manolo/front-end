export const storageConstants = {
    TOKEN: "token",
    USER: "user",
    ENABLED_LAYERS(userId: string | number) {
        return `${userId}-enabled-layers`;
    },
};
