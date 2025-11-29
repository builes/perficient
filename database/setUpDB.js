import { pool } from "./connect.js";

export const setupDB = async () => {
  // Tabla resources
  await pool.query(`
    CREATE TABLE IF NOT EXISTS resources (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      current_quantity INT NOT NULL DEFAULT 0,
      max_quantity INT NOT NULL DEFAULT 0,
      critical_level INT NOT NULL DEFAULT 0
    );
  `);

  // Tabla log_history
  await pool.query(`
    CREATE TABLE IF NOT EXISTS log_history (
      id INT AUTO_INCREMENT PRIMARY KEY,
      resource_id INT NOT NULL,
      action VARCHAR(50) NOT NULL,
      amount INT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (resource_id) REFERENCES resources(id)
    );
  `);

  console.log("📦 Tablas listas");
};
