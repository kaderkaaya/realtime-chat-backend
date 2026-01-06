import express from 'express';

const app = express();
app.use(express.json());

app.get('/health', (_, res) => {
    res.json({ ok: true });
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
