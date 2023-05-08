import { User } from "../../models";

const resolvers = {
    Query: {
        allUsers: async (root, args, context) => {
            try {
                const users = await User.findAll();
                return users;
            } catch (error) {
                throw new Error("Error fetching users");
            }
        },
    },
};

export default resolvers;
