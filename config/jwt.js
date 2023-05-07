import { env } from "./index";

const getJWTSigningSecret = () => {
    const secret = env.JWT_SECRET;
    if (!secret) {
        throw new Error("Missing secrets to sign JWT token");
    }
    return secret;
};

export const secret = getJWTSigningSecret();
