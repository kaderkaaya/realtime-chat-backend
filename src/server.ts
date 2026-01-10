import express from 'express';
import sequelize from './config/env.js';
import dotenv from 'dotenv';
import './models/associates.js'
import applySecurity from './utils/security.js';
dotenv.config();
const app = express();
app.use(express.json());
applySecurity(app);
const startServer = async () => {
    try {
        console.log("Starting server...");
        await sequelize.authenticate();
        await sequelize.sync({ alter: true });
    } catch (error) {
        console.error("Failed to start server:", error);
    }
};

startServer()


app.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`);
});
