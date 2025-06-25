import { PrismaClient } from '../prisma/generated/prisma/client';

let prisma: PrismaClient;

export const initializePrisma = async () => {
    try {
        prisma = new PrismaClient();
        await prisma.$connect();
        console.log('Connected to database');
    } catch (error) {
        console.error('Error connecting to database:', error);
        process.exit(1);
    }
}

export const getPrisma = () => {
    return prisma;
}
