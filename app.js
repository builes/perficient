import dotenv from "dotenv";
dotenv.config();

import { pool } from "./database/connect.js";
import { Server } from "./server.js";
import { setupDB } from "./database/setUpDB.js";
import { seedDB } from "./database/seedDB.js";

const startApp = async () => {
  try {
    // siempre conectar a la base de datos antes de levantar el servidor
    //siempre que se hace una peticion a la BD usamos await

    await pool.query("SELECT 1");
    await setupDB(); // crea tablas si no existen
    await seedDB(); // inserta datos iniciales si la tabla está vacía

    const server = new Server(); // Aquí se levanta el servidor solo si la BD está OK
  } catch (err) {
    console.error("❌ Error crítico al iniciar la app:", err);
  }
};

startApp();
