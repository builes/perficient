import { pool } from "../database/connect.js";

export const getLogs = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM log_history");
    return res.json(rows);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error al obtener los logs" });
  }
};
