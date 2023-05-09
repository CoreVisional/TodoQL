import { User } from "../../../database/models";
import { hashPassword, authenticate, generateJWT } from "../../utils/security";
import { GraphQLError } from "graphql";

const resolvers = {
    Mutation: {
        async register(root, args, context) {
            const { email, password } = args.input;

            // Hash the password before creating the user
            const hashedPassword = await hashPassword(password);

            const newUser = await User.create({
                email,
                password: hashedPassword,
            });

            return newUser;
        },

        async login(root, args, { res }) {
            const { email, password } = args.input;

            const user = await User.scope(null).findOne({ where: { email } });

            if (user) {
                const isPasswordValid = await authenticate(
                    password,
                    user.password
                );

                if (isPasswordValid) {
                    const token = generateJWT(user);
                    const cookieOptions = {
                        httpOnly: true,
                    };

                    res.cookie("jwt", token, cookieOptions);
                    return { ...user.toJSON(), token };
                }
            }

            throw new GraphQLError("Invalid credentials", {
                extensions: {
                    code: "UNAUTHENTICATED",
                    http: { status: 401 },
                },
            });
        },
    },
};

export default resolvers;
