import { getPrisma } from "../prisma";

const prisma = getPrisma();

export const getUsers = async () => {
    try {
        const users = await prisma.user.findMany();
        return users;
    } catch (error) {
        throw new Error('Failed to get users');
    }
};

export const getUserById = async (id: string) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: id },
            include: {
                posts: true
            }
        });
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : 'Failed to get user by id');
    }
}