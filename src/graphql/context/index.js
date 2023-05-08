import { User } from "../../../database/models";
import jwt from "jsonwebtoken";
import { secret } from "../../../config/jwt";

const verifyToken = async (token) => {
    try {
        if (!token) {
            return null;
        }
        const decodedToken = await jwt.verify(token, secret);
        const user = await User.findOne({ where: { id: decodedToken.userid } });
        return user;
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            throw new GraphQLError("Invalid or Expired token", {
                extensions: {
                    code: "UNAUTHENTICATED",
                    http: { status: 401 },
                },
            });
        } else {
            throw new Error("Unknown error during token verification");
        }
    }
};

export default verifyToken;
