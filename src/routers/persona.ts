import { Router } from "express";
import { LoginPersona, newPersona } from "../controllers/persona";

const router = Router();

router.post("/", newPersona);
router.post("/login", LoginPersona)

export default router;