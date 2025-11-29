import { Router } from "express";
import {
  requestSupplies,
  requestSupplyById,
} from "../controllers/requests.controller.js";

const router = Router();

router.get("/", requestSupplies);

router.get("/:id", requestSupplyById);

// router.get("/", consumeResources);

export default router;
