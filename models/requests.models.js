import { pool } from "../database/connect.js";

export const addLog = async (resourceId, action, amount) => {
  await pool.query(
    `INSERT INTO log_history (resource_id, action, amount)
     VALUES (?, ?, ?)`,
    [resourceId, action, amount]
  );
};

export const updateMaxQuantities = async () => {
  // obtener recursos antes de actualizar
  const [resources] = await pool.query(`
    SELECT id, max_quantity 
    FROM resources
  `);

  // actualizar todo
  await pool.query(`
    UPDATE resources
    SET current_quantity = max_quantity
  `);

  // logs por cada recurso
  for (const r of resources) {
    await addLog(r.id, "refill_all", r.max_quantity);
  }
};

export const updateMaxQuantitiesById = async (id) => {
  // obtener datos del recurso
  const [[resource]] = await pool.query(
    `SELECT current_quantity, max_quantity FROM resources WHERE id = ?`,
    [id]
  );

  // si no existe
  if (!resource) return "NOT_FOUND";

  // si ya está al máximo
  if (resource.current_quantity >= resource.max_quantity) {
    return "ALREADY_MAX";
  }

  // actualizar al máximo
  await pool.query(
    `
    UPDATE resources
    SET current_quantity = max_quantity
    WHERE id = ?
    `,
    [id]
  );

  // registrar log
  await addLog(id, "refill_one", resource.max_quantity);

  return "REFILLED";
};
