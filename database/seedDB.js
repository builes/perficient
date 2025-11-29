import { pool } from "./connect.js";

export const seedDB = async () => {
  // Insertar recursos solo si la tabla está vacía
  const [rows] = await pool.query("SELECT COUNT(*) AS count FROM resources");

  if (rows[0].count > 0) {
    console.log("📦 La tabla resources ya tiene datos. Seed ignorado.");
    return;
  }

  // Recursos iniciales
  const resources = [
    ["oxigeno", 50, 100, 20],
    ["agua", 500, 2000, 200],
    ["repuestos", 100, 1000, 50],
    ["comida", 100, 1000, 50],
  ];

  await pool.query(
    `INSERT INTO resources (name, current_quantity, max_quantity, critical_level)
     VALUES ?`,
    [resources]
  );

  console.log("🌱 Recursos iniciales insertados.");
};
