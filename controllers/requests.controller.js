import {
  updateMaxQuantities,
  updateMaxQuantitiesById,
} from "../models/requests.models.js";

export const requestSupplies = async (req, res) => {
  try {
    await updateMaxQuantities();

    res.json({ message: "Todos los recursos fueron rellenados al máximo" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar los recursos" });
  }
};

export const requestSupplyById = async (req, res) => {
  const { id } = req.params;
  try {
    await updateMaxQuantitiesById(id);

    res.json({ message: `El recurso con ID ${id} fue rellenado al máximo` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar el recurso" });
  }
};

export const consumeResources = async (req, res) => {
  try {
    // Lógica para consumir recursos (a implementar)
    res.json({ message: "Recursos consumidos correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al consumir los recursos" });
  }
};
