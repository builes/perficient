import { pool } from "../database/connect.js";

// obtener todos
export const findAllResources = () => {
  return pool.query("SELECT * FROM resources");
};

// obtener uno por id
export const findResourceById = (id) => {
  return pool.query("SELECT * FROM resources WHERE id = ?", [id]);
};

// crear uno nuevo
export const createResourceDB = (data) => {
  const { name, current_quantity, max_quantity, critical_level } = data;

  return pool.query(
    `INSERT INTO resources (name, current_quantity, max_quantity, critical_level)
     VALUES (?, ?, ?, ?)`,
    [name, current_quantity, max_quantity, critical_level]
  );
};

// actualizar
export const updateResourceDB = (id, data) => {
  const { name, current_quantity, max_quantity, critical_level } = data;

  return pool.query(
    `UPDATE resources
     SET name = ?, current_quantity = ?, max_quantity = ?, critical_level = ?
     WHERE id = ?`,
    [name, current_quantity, max_quantity, critical_level, id]
  );
};

// eliminar
export const deleteResourceDB = (id) => {
  return pool.query("DELETE FROM resources WHERE id = ?", [id]);
};
