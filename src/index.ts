import express, { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import { initializePrisma } from './prisma';

dotenv.config();
initializePrisma();
const app = express();
const port = process.env.PORT || 3000;


import { getUserById, getUsers } from './services/users';


app.use(express.json());
app.use(cors());

// Get all users
app.get('/', async (req: Request, res: Response) => {
    const users = await getUsers();
    res.json(users);
});

// Get a user by id & posts
app.get('/user/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await getUserById(id);
    res.json(user);
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Internal server error' });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

