import express from 'express';
import { connectDatabase } from './config/env.js';
import dotenv from 'dotenv';

dotenv.config();

await connectDatabase();
const app = express();
app.use(express.json());

app.get('/health', (_, res) => {
    res.json({ ok: true });
});

app.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`);
});
