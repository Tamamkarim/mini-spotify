import dotenv from "dotenv";
dotenv.config();
import mysql from "mysql2";

const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "Karim88",
  database: process.env.DB_NAME || "mini_spotify",
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306
});

db.connect((err) => {
  if (err) {
    console.error("MySQL connection error:", err);
    process.exit(1);
  }
  console.log("MySQL Connected");
});

export default db;
