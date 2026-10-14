import mysql from "mysql2/promise";
import "dotenv/config";

const db = mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_DATABASE || "sistema_receitas"
});

export async function testarConexao() {
    const connection = await db.getConnection();
    connection.release();
}

export default db;