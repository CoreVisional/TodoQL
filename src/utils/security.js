import jwt from "jsonwebtoken";
import { env } from "../../config/index";
import { secret } from "../../config/jwt";
import bcrypt from "bcrypt";

const saltRounds = 10;

export const hashPassword = async (password) => {
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (err) {
        console.error(err);
        throw new Error("Error hashing password");
    }
};

export const authenticate = async (plainTextPassword, hashedPassword) => {
    try {
        return await bcrypt.compare(plainTextPassword, hashedPassword);
    } catch (error) {
        console.error(error);
        throw new Error("Error comparing password and hash");
    }
};

export const generateJWT = (user) => {
    const today = new Date();

    return jwt.sign(
        {
            userid: user.id,
            email: user.email,
            iat: Math.floor(today.getTime() / 1000),
        },
        secret,
        {
            algorithm: "HS256",
            expiresIn: env.TOKEN_EXPIRATION,
        }
    );
};
