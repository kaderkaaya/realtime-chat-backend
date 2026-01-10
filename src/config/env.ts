import { Sequelize } from "sequelize";
import dotenv from 'dotenv';

dotenv.config({
});


const DB_DIALECT = process.env.DB_DIALECT;
const DB_HOST = process.env.DB_HOST;
const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

const sequelize = new Sequelize(
    DB_NAME!,
    DB_USER!,
    DB_PASSWORD!,
    {
        host: DB_HOST,
        dialect: DB_DIALECT as 'mysql',
        logging: false,
        pool: {
            max: 10, //max concurrent connections
            min: 2, //min concurrent connections
            acquire: 30000, //max time to get connection from pool(bekleme süresi)
            idle: 10000, //max time a connection can be idle before being released(boşta kalma süresi)  
        },
    }
);

export const connectDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log("Database connection has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
};
export default sequelize;