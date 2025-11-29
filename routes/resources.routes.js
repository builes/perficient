import { Router } from "express";
import {
  getResourceById,
  getResources,
} from "../controllers/resources.controllers.js";
const router = Router();

router.get("/", getResources);
router.get("/:id", getResourceById);

export default router;
