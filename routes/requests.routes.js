import { Router } from "express";
import {
  consumeResource,
  requestSupplies,
  requestSupplyById,
} from "../controllers/requests.controller.js";

const router = Router();

router.get("/", requestSupplies);

router.get("/:id", requestSupplyById);

router.get("/consume/:id", consumeResource);

export default router;
