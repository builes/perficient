import { pool } from "../database/connect.js";
import {
  findAllResources,
  findResourceById,
} from "../models/resources.models.js";

export const getResources = async (req, res) => {
  try {
    const [rows] = await findAllResources();
    return res.json(rows);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error al obtener los recursos" });
  }
};

export const createResource = async (req, res) => {
  try {
    const { name, current_quantity, max_quantity, critical_level } = req.body;

    // insertar
    await pool.query(
      `INSERT INTO resources (name, current_quantity, max_quantity, critical_level)
       VALUES (?, ?, ?, ?)`,
      [name, current_quantity, max_quantity, critical_level]
    );

    return res.json({ message: "Resource created" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error creating resource" });
  }
};

export const getResourceById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id, "este es el id");

    const [rows] = await findResourceById(id);

    // si no existe
    if (rows.length === 0) {
      return res.status(404).json({ message: "Resource not found" });
    }

    return res.json(rows[0]);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error fetching resource" });
  }
};

export const updateResource = async (req, res) => {
  try {
    const { id } = req.params;

    const { affectedRows } = (await updateResourceDB(id, req.body))[0];

    if (affectedRows === 0) {
      return res.status(404).json({ message: "Resource not found" });
    }

    return res.json({ message: `Resource with ID: ${id} updated` });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error updating resource" });
  }
};

export const deleteResource = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM resources WHERE id = ?", [id]);
    return res.json({ message: `Resource with ID: ${id} deleted` });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error deleting resource" });
  }
};
