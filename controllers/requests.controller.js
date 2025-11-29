import {
  consumeResourceById,
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
    const result = await updateMaxQuantitiesById(id);

    if (result === "NOT_FOUND") {
      return res
        .status(404)
        .json({ error: `El recurso con ID ${id} no existe` });
    }

    if (result === "ALREADY_MAX") {
      return res.json({ message: `El recurso con ID ${id} ya está al máximo` });
    }

    return res.json({
      message: `El recurso con ID ${id} fue rellenado al máximo`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar el recurso" });
  }
};

export const consumeResource = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await consumeResourceById(id);

    if (result === "NOT_FOUND") {
      return res
        .status(404)
        .json({ error: `El recurso con ID ${id} no existe` });
    }

    if (result === "NO_STOCK") {
      return res.status(400).json({
        error: `El recurso con ID ${id} no tiene cantidad disponible`,
      });
    }

    return res.json({
      message: `Recurso consumido correctamente`,
      consumed: result.consumed,
      remaining: result.remaining,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al consumir el recurso" });
  }
};
