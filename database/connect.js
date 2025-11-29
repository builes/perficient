import mysql from "mysql2/promise";

export const pool = mysql.createPool({
  host: "localhost", // o 127.0.0.1
  user: "root", // tu usuario
  password: "1234", // tu contraseña (si la tienes)
  database: "mars", // tu BD ya creada
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
