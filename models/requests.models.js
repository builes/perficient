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

export const consumeResourceById = async (id) => {
  // obtener datos del recurso
  const [[resource]] = await pool.query(
    `SELECT current_quantity, max_quantity FROM resources WHERE id = ?`,
    [id]
  );

  if (!resource) return "NOT_FOUND";

  // si no hay nada para consumir
  if (resource.current_quantity <= 0) return "NO_STOCK";

  // consumo = 5% del max_quantity
  const consumeAmount = resource.max_quantity * 0.05;

  // calcular nuevo valor
  let newQuantity = resource.current_quantity - consumeAmount;

  // evitar valores negativos
  if (newQuantity < 0) newQuantity = 0;

  // actualizar recurso
  await pool.query(
    `
    UPDATE resources
    SET current_quantity = ?
    WHERE id = ?
    `,
    [newQuantity, id]
  );

  // registrar log
  await addLog(id, "consume", consumeAmount);

  return {
    consumed: consumeAmount,
    remaining: newQuantity,
  };
};

export const autoConsumeOnePercent = async () => {
  const [resources] = await pool.query(`SELECT * FROM resources`);

  for (const resource of resources) {
    const id = resource.id;
    const consumeAmount = resource.max_quantity * 0.01; // 1%

    let newQuantity = resource.current_quantity - consumeAmount;
    if (newQuantity < 0) newQuantity = 0;

    await pool.query(`UPDATE resources SET current_quantity = ? WHERE id = ?`, [
      newQuantity,
      id,
    ]);

    await addLog(id, "auto-consume", consumeAmount);
  }

  console.log("⏳ Se consumió 1% automáticamente");
};
