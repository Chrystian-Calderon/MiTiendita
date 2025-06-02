import mysql from 'mysql2/promise';
import { config } from 'dotenv';

config();
const connection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
const textConnection = await connection.getConnection();
await textConnection.ping();
console.log('Database connection established successfully');

export default connection;